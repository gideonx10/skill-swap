'use client';
import React from 'react';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';

// Nav links matching your landing page theme
const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Explore', href: '/explore' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

export default function LandingNavbar() {
  const { data: session } = useSession();
  const user = session?.user;

  return (
    <>
      {/* Top header: Logo left, Profile right */}
      <div
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '2rem 3rem 0 3rem',
          fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
          position: 'relative',
          zIndex: 20,
        }}
      >
        <Link href="/" style={{
          fontWeight: 900,
          fontSize: "2rem",
          background: "linear-gradient(to right, #4f46e5, #7c3aed, #ec4899)",
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
          color: "transparent",
          letterSpacing: "-0.02em",
          textDecoration: "none",
          filter: "drop-shadow(0 2px 4px rgba(79, 70, 229, 0.1))"
        }}>
          SkillSwap
        </Link>
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          {user ? (
            <>
              <Link href="/dashboard" style={{ display: "flex", alignItems: "center" }}>
                <img
                  src={
                    user.image ||
                    `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name ?? "U")}&background=4f46e5&color=ffffff&size=128`
                  }
                  alt="Profile"
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: "50%",
                    objectFit: "cover",
                    border: "2px solid rgba(255, 255, 255, 0.8)",
                    background: "linear-gradient(to br, #4f46e5, #7c3aed)",
                    boxShadow: "0 4px 12px rgba(79, 70, 229, 0.3)",
                  }}
                />
              </Link>
              <button
                onClick={() => signOut()}
                style={{
                  background: "rgba(255, 255, 255, 0.9)",
                  border: "1px solid rgba(79, 70, 229, 0.2)",
                  borderRadius: "12px",
                  padding: "0.5rem 1rem",
                  fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
                  fontSize: "0.875rem",
                  fontWeight: 600,
                  color: "#374151",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  backdropFilter: "blur(10px)",
                  boxShadow: "0 2px 8px rgba(79, 70, 229, 0.1)",
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = "linear-gradient(to right, rgba(239, 68, 68, 0.1), rgba(220, 38, 38, 0.1))";
                  e.currentTarget.style.color = "#dc2626";
                  e.currentTarget.style.borderColor = "rgba(239, 68, 68, 0.3)";
                  e.currentTarget.style.transform = "translateY(-1px)";
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = "rgba(255, 255, 255, 0.9)";
                  e.currentTarget.style.color = "#374151";
                  e.currentTarget.style.borderColor = "rgba(79, 70, 229, 0.2)";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              href="/login"
              style={{
                background: "linear-gradient(to right, #4f46e5, #7c3aed)",
                border: "none",
                borderRadius: "12px",
                padding: "0.5rem 1rem",
                fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
                fontSize: "0.875rem",
                fontWeight: 600,
                color: "white",
                textDecoration: "none",
                transition: "all 0.3s ease",
                boxShadow: "0 4px 12px rgba(79, 70, 229, 0.3)",
                display: "inline-block",
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = "linear-gradient(to right, #4338ca, #6d28d9)";
                e.currentTarget.style.transform = "translateY(-1px)";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = "linear-gradient(to right, #4f46e5, #7c3aed)";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              Login
            </Link>
          )}
        </div>
      </div>

      {/* Glassmorphism navbar: fixed, centered */}
      <nav
        style={{
          position: 'fixed',
          top: 24,
          left: '50%',
          transform: 'translateX(-50%)',
          width: '70vw',
          maxWidth: 820,
          minWidth: 340,
          height: 64,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 50,
          backdropFilter: 'blur(20px)',
          background: 'rgba(255, 255, 255, 0.85)', // Light glass effect matching your theme
          borderRadius: 20,
          border: '1px solid rgba(79, 70, 229, 0.1)',
          boxShadow: '0 8px 32px 0 rgba(79, 70, 229, 0.12), 0 2px 16px 0 rgba(139, 92, 246, 0.08)',
          fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
        }}
      >
        <div style={{
          display: "flex",
          gap: "2.5rem",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
        }}>
          {NAV_LINKS.map(link => (
            <Link
              key={link.href}
              href={link.href}
              style={{
                color: "#374151", // Gray-700 to match your landing page text
                fontWeight: 600,
                fontSize: "0.95rem",
                textDecoration: "none",
                letterSpacing: "0.02em",
                padding: "0.5rem 1rem",
                borderRadius: "12px",
                transition: "all 0.3s ease",
                background: "transparent",
                position: "relative",
                fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = "linear-gradient(to right, rgba(79, 70, 229, 0.1), rgba(139, 92, 246, 0.1))";
                e.currentTarget.style.color = "#4f46e5";
                e.currentTarget.style.transform = "translateY(-1px)";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.color = "#374151";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </nav>
    </>
  );
}