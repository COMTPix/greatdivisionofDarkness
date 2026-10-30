import Image from "next/image";
import QRCode from "qrcode";

export async function UserQr({ token, name }: { token: string; name: string }) {
  const dataUrl = await QRCode.toDataURL(`KONTUR18:${token}`, {
    errorCorrectionLevel: "H",
    margin: 2,
    width: 720,
    color: {
      dark: "#07111f",
      light: "#f8fafc",
    },
  });

  return (
    <div className="qr-frame relative mx-auto aspect-square w-full max-w-[286px] overflow-hidden rounded-[28px] bg-slate-50 p-3.5">
      <Image
        src={dataUrl}
        alt={`Постоянный QR-пропуск пользователя ${name}`}
        width={720}
        height={720}
        unoptimized
        priority
        className="size-full rounded-2xl"
      />
      <span className="pointer-events-none absolute inset-0 rounded-[28px] ring-1 ring-inset ring-white/80" />
    </div>
  );
}
