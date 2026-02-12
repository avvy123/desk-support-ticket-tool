import ProviderWrapper from "../src/components/ProviderWrapper";
import "./globals.css";
export default function RootLayout({ children }: any) {
  return (
    <html>
      <body>
        <ProviderWrapper>{children}</ProviderWrapper>
      </body>
    </html>
  );
}
