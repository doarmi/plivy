export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ message: 'POST 요청만 지원합니다.' });
  }

  const { email } = req.body || {};
  if (typeof email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ message: '올바른 이메일 주소를 입력해주세요.' });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESET_FROM_EMAIL;
  const siteUrl = process.env.SITE_URL || `https://${req.headers.host}`;

  if (!apiKey || !from) {
    return res.status(503).json({
      message: '메일 발송 설정이 아직 연결되지 않았어요. Vercel 환경변수를 확인해주세요.',
    });
  }

  const resetUrl = `${siteUrl.replace(/\/$/, '')}/#/reset-password?email=${encodeURIComponent(email)}`;

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from,
        to: [email],
        subject: '[PLIVY] 비밀번호 재설정 안내',
        html: `
          <div style="font-family:Arial,sans-serif;line-height:1.7;color:#2b2430;max-width:560px;margin:auto;padding:32px">
            <h1 style="letter-spacing:.18em;color:#9d163c">PLIVY</h1>
            <h2>비밀번호 재설정 안내</h2>
            <p>PLIVY 계정의 비밀번호 재설정 요청을 받았어요.</p>
            <p>아래 버튼을 눌러 새 비밀번호를 설정해 주세요.</p>
            <p style="margin:28px 0">
              <a href="${resetUrl}" style="display:inline-block;background:#c21f52;color:white;text-decoration:none;padding:12px 20px;border-radius:999px;font-weight:700">비밀번호 재설정하기</a>
            </p>
            <p style="font-size:12px;color:#8a818c">본 메일은 포트폴리오 데모용 PLIVY에서 발송되었습니다.</p>
          </div>
        `,
      }),
    });

    const data = await response.json().catch(() => ({}));
    if (!response.ok) {
      console.error('Resend error:', data);
      return res.status(502).json({ message: '메일 서버에서 전송을 완료하지 못했어요.' });
    }

    return res.status(200).json({ ok: true });
  } catch (error) {
    console.error('Password reset mail error:', error);
    return res.status(500).json({ message: '메일 전송 중 오류가 발생했어요.' });
  }
}
