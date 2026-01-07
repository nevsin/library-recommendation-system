import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Navigation } from './Navigation';
import { useAuth } from '@/hooks/useAuth';

/**
 * Modern Header component with glass morphism effect
 * Auth-aware (Login / User dropdown)
 */
export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const { user, logout, isLoading } = useAuth();

  // sadece isim göster (admin prefix vs yok)
  const displayName =
    user?.name?.replace(/^admin\s*/i, '') ||
    user?.email?.split('@')[0];

  return (
    <header className="glass-effect sticky top-0 z-50 border-b border-white/20 shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-violet-500/30 group-hover:shadow-xl group-hover:shadow-violet-500/40 transition-all duration-300 group-hover:scale-110">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                </svg>
              </div>
            </div>
            <span className="text-xl font-bold gradient-text">LibraryAI</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <Navigation />
          </div>

          {/* USER AREA (DESKTOP) */}
          {!isLoading && (
            <div className="hidden md:flex items-center space-x-3 relative">
              {user ? (
                <>
                  <button
                    onClick={() => setIsUserMenuOpen((p) => !p)}
                    className="flex items-center gap-2 bg-gradient-to-r from-violet-600 to-indigo-600 text-white px-4 py-2 rounded-xl font-semibold shadow-lg hover:from-violet-700 hover:to-indigo-700 transition"
                  >
                    {displayName}
                    <svg
                      className={`w-4 h-4 transition-transform ${
                        isUserMenuOpen ? 'rotate-180' : ''
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>

                  {isUserMenuOpen && (
                    <div className="absolute right-0 top-12 w-56 bg-white rounded-xl shadow-xl border z-50">
                      <div className="px-4 py-3 border-b">
                        <p className="text-sm font-semibold text-slate-800">
                          {displayName}
                        </p>
                        <p className="text-xs text-slate-500">
                          {user.email}
                        </p>
                      </div>

                      <button
                        onClick={logout}
                        className="w-full text-left px-4 py-3 text-sm font-semibold text-red-600 hover:bg-red-50 rounded-b-xl"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="text-slate-700 hover:text-violet-600 transition-colors font-semibold px-4 py-2 rounded-lg hover:bg-violet-50"
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    className="bg-gradient-to-r from-violet-600 to-indigo-600 text-white px-6 py-2.5 rounded-xl hover:from-violet-700 hover:to-indigo-700 transition-all shadow-lg shadow-violet-500/30 font-semibold"
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          )}

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-slate-700 hover:text-violet-600 transition-colors p-2 rounded-lg hover:bg-violet-50"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-white/20 animate-slide-in">
            <Navigation mobile />

            {!isLoading && (
              <div className="mt-4 space-y-2">
                {user ? (
                  <>
                    <div className="px-4 py-2">
                      <p className="font-semibold">{displayName}</p>
                      <p className="text-xs text-slate-500">{user.email}</p>
                    </div>
                    <button
                      onClick={logout}
                      className="block w-full text-left text-red-600 font-semibold px-4 py-2 hover:bg-red-50 rounded-lg"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link to="/login" className="block px-4 py-2 font-semibold hover:bg-violet-50 rounded-lg">
                      Login
                    </Link>
                    <Link
                      to="/signup"
                      className="block bg-gradient-to-r from-violet-600 to-indigo-600 text-white px-4 py-2.5 rounded-xl text-center font-semibold"
                    >
                      Sign Up
                    </Link>
                  </>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
}
