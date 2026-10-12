'use client';

import TelephonyReferenceConsole from '../components/TelephonyReferenceConsole';
import { useRouter } from 'next/navigation';

export default function ReferencePage() {
  const router = useRouter();

  return (
    <TelephonyReferenceConsole onBackToGenerator={() => router.push('/')} />
  );
}
