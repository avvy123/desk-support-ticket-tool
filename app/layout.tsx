import { Toaster } from "react-hot-toast";
import ProviderWrapper from "../src/components/ProviderWrapper";
import "./globals.css";
export default function RootLayout({ children }: any) {
  return (
    <html>
      <body>
        <ProviderWrapper>
          <Toaster position="top-right" />
          {children}
        </ProviderWrapper>
      </body>
    </html>
  );
}
