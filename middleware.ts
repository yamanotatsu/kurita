import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Basic認証の設定（環境変数またはデフォルト値）
const BASIC_AUTH_USER = process.env.BASIC_AUTH_USER || 'kurita'
const BASIC_AUTH_PASSWORD = process.env.BASIC_AUTH_PASSWORD || 'chicken'

export function middleware(request: NextRequest) {
  // 静的ファイルはスキップ
  const { pathname } = request.nextUrl
  if (pathname.match(/\.(png|jpg|jpeg|gif|ico|svg|webp)$/)) {
    return NextResponse.next()
  }

  // 認証失敗Cookieをチェック
  const authFailed = request.cookies.get('auth_failed')

  // 認証失敗ページを表示中の場合
  if (authFailed?.value === 'true') {
    const html = `
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>認証エラー</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #1A1A1A;
      font-family: 'Helvetica Neue', Arial, sans-serif;
    }
    .container {
      text-align: center;
      padding: 2rem;
    }
    .message {
      font-size: clamp(3rem, 15vw, 8rem);
      font-weight: 900;
      color: #C9553D;
      text-shadow: 0 0 50px rgba(201, 85, 61, 0.5);
      animation: shake 0.5s ease-in-out infinite;
    }
    .sub {
      font-size: 1.5rem;
      color: #666;
      margin-top: 1rem;
    }
    .retry {
      margin-top: 2rem;
      padding: 1rem 2rem;
      background: #C9553D;
      color: white;
      border: none;
      border-radius: 8px;
      font-size: 1rem;
      cursor: pointer;
      text-decoration: none;
      display: inline-block;
    }
    .retry:hover {
      background: #a84432;
    }
    @keyframes shake {
      0%, 100% { transform: translateX(0); }
      25% { transform: translateX(-10px); }
      75% { transform: translateX(10px); }
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="message">違うわ！！！</div>
    <p class="sub">認証情報が間違っています 🍗</p>
    <a href="/" class="retry" onclick="document.cookie='auth_failed=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT'; location.reload();">もう一度試す</a>
  </div>
</body>
</html>
`
    return new NextResponse(html, {
      status: 401,
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
      },
    })
  }

  const authHeader = request.headers.get('authorization')

  if (authHeader) {
    try {
      const authValue = authHeader.split(' ')[1]
      const decoded = Buffer.from(authValue, 'base64').toString('utf-8')
      const [user, password] = decoded.split(':')

      if (user === BASIC_AUTH_USER && password === BASIC_AUTH_PASSWORD) {
        // 認証成功時はCookieをクリア
        const response = NextResponse.next()
        response.cookies.delete('auth_failed')
        return response
      } else {
        // 認証失敗時はCookieを設定してエラーページを表示
        const html = `
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>認証エラー</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #1A1A1A;
      font-family: 'Helvetica Neue', Arial, sans-serif;
    }
    .container {
      text-align: center;
      padding: 2rem;
    }
    .message {
      font-size: clamp(3rem, 15vw, 8rem);
      font-weight: 900;
      color: #C9553D;
      text-shadow: 0 0 50px rgba(201, 85, 61, 0.5);
      animation: shake 0.5s ease-in-out infinite;
    }
    .sub {
      font-size: 1.5rem;
      color: #666;
      margin-top: 1rem;
    }
    .retry {
      margin-top: 2rem;
      padding: 1rem 2rem;
      background: #C9553D;
      color: white;
      border: none;
      border-radius: 8px;
      font-size: 1rem;
      cursor: pointer;
      text-decoration: none;
      display: inline-block;
    }
    .retry:hover {
      background: #a84432;
    }
    @keyframes shake {
      0%, 100% { transform: translateX(0); }
      25% { transform: translateX(-10px); }
      75% { transform: translateX(10px); }
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="message">違うわ！！！</div>
    <p class="sub">認証情報が間違っています 🍗</p>
    <a href="/" class="retry" onclick="document.cookie='auth_failed=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT'; location.reload();">もう一度試す</a>
  </div>
</body>
</html>
`
        const response = new NextResponse(html, {
          status: 401,
          headers: {
            'Content-Type': 'text/html; charset=utf-8',
          },
        })
        response.cookies.set('auth_failed', 'true', {
          path: '/',
          maxAge: 60,
        })
        return response
      }
    } catch {
      // デコードエラーの場合は認証失敗
      const html = `
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>認証エラー</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #1A1A1A;
      font-family: 'Helvetica Neue', Arial, sans-serif;
    }
    .container {
      text-align: center;
      padding: 2rem;
    }
    .message {
      font-size: clamp(3rem, 15vw, 8rem);
      font-weight: 900;
      color: #C9553D;
      text-shadow: 0 0 50px rgba(201, 85, 61, 0.5);
      animation: shake 0.5s ease-in-out infinite;
    }
    .sub {
      font-size: 1.5rem;
      color: #666;
      margin-top: 1rem;
    }
    .retry {
      margin-top: 2rem;
      padding: 1rem 2rem;
      background: #C9553D;
      color: white;
      border: none;
      border-radius: 8px;
      font-size: 1rem;
      cursor: pointer;
      text-decoration: none;
      display: inline-block;
    }
    .retry:hover {
      background: #a84432;
    }
    @keyframes shake {
      0%, 100% { transform: translateX(0); }
      25% { transform: translateX(-10px); }
      75% { transform: translateX(10px); }
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="message">違うわ！！！</div>
    <p class="sub">認証情報が間違っています 🍗</p>
    <a href="/" class="retry" onclick="document.cookie='auth_failed=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT'; location.reload();">もう一度試す</a>
  </div>
</body>
</html>
`
      const response = new NextResponse(html, {
        status: 401,
        headers: {
          'Content-Type': 'text/html; charset=utf-8',
        },
      })
      response.cookies.set('auth_failed', 'true', {
        path: '/',
        maxAge: 60,
      })
      return response
    }
  }

  // 認証ヘッダーがない場合は通常のBasic認証を要求
  return new NextResponse('認証が必要です', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="Secure Area"',
    },
  })
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}

