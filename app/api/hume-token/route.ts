import { NextResponse } from 'next/server';
import { getHumeAccessToken } from '@/utils/getHumeAccessToken';

export async function GET() {
  try {
    const accessToken = await getHumeAccessToken();
    
    if (!accessToken) {
      return NextResponse.json({ error: 'Failed to fetch access token' }, { status: 500 });
    }

    return NextResponse.json({ accessToken });
  } catch (error) {
    console.error('Error fetching Hume access token:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
