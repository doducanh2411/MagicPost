"use client";

import AppHeader from "/home/doduy/Web/MagicPost/client/src/components/header";
import { Inter } from "next/font/google";
import { Container, Navbar } from "react-bootstrap";
// import "./globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
const inter = Inter({ subsets: ["latin"] });

// export const metadata = {
//   title: 'Create Next App',
//   description: 'Generated by create next app',
// }

export default function Layout({ children }) {
  return (
    <section>
      <AppHeader></AppHeader>
      <Container>{children}</Container>
    </section>
  );
}
