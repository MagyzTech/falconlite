import Image from "next/image";
import "./globals.css";
import styles from "./page.module.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.js. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body>
        <div className={styles.main}>
          <div className="lg:px-[4rem] lg:py-8 py-8 px-4">
            <div className="wrapper">
              <div className="flex justify-center mb-5">
                <div className="relative w-[200px] h-[70px]">
                  <Image
                    src="/logo.png"
                    alt="Falconlite"
                    fill
                    sizes="200px"
                    object-fit="cover"
                    priority
                  />
                </div>
              </div>
              <div>{children}</div>
            </div>
          </div>
          <div className="relative bg-[#01C8FF] w-full h-full hidden lg:block">
            <div className={styles.illustrate}></div>
          </div>
        </div>
      </body>
    </html>
  );
}
