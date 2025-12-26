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

  const authHeader = request.headers.get('authorization')

  if (authHeader) {
    try {
      const authValue = authHeader.split(' ')[1]
      const decoded = Buffer.from(authValue, 'base64').toString('utf-8')
      const [user, password] = decoded.split(':')

      if (user === BASIC_AUTH_USER && password === BASIC_AUTH_PASSWORD) {
        return NextResponse.next()
      }
    } catch {
      // デコードエラーの場合は認証失敗
    }
  }

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

