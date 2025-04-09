
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, Leaf } from 'lucide-react';
import { ThemeToggle } from '../theme/ThemeToggle';
import { useAuth } from '@/contexts/AuthContext';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleLoginClick = () => {
    navigate('/auth');
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-background/80 backdrop-blur-md z-50 border-b border-border">
      <nav className="cs-container py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-md bg-gradient-to-br from-cs-green-500 to-cs-blue-400 flex items-center justify-center">
            <Leaf className="h-5 w-5 text-white" />
          </div>
          <span className="text-xl font-bold">CarbonSense</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          <Link to="/dashboard" className="text-sm font-medium hover:text-cs-green-600 dark:hover:text-cs-green-400 transition-colors">Dashboard</Link>
          <Link to="/track" className="text-sm font-medium hover:text-cs-green-600 dark:hover:text-cs-green-400 transition-colors">Track Carbon</Link>
          <Link to="/reduce" className="text-sm font-medium hover:text-cs-green-600 dark:hover:text-cs-green-400 transition-colors">Reduce Impact</Link>
          <Link to="/about" className="text-sm font-medium hover:text-cs-green-600 dark:hover:text-cs-green-400 transition-colors">About</Link>
          <ThemeToggle />
          {!user && <Button variant="default" size="sm" onClick={handleLoginClick}>Login</Button>}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center gap-2">
          <ThemeToggle />
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </Button>
        </div>
      </nav>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden py-4 px-4 bg-background border-b border-border animate-fade-in">
          <div className="flex flex-col space-y-4">
            <Link 
              to="/dashboard" 
              className="px-4 py-2 rounded-md hover:bg-muted transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Dashboard
            </Link>
            <Link 
              to="/track" 
              className="px-4 py-2 rounded-md hover:bg-muted transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Track Carbon
            </Link>
            <Link 
              to="/reduce" 
              className="px-4 py-2 rounded-md hover:bg-muted transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Reduce Impact
            </Link>
            <Link 
              to="/about" 
              className="px-4 py-2 rounded-md hover:bg-muted transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            {!user && <Button className="w-full" size="sm" onClick={handleLoginClick}>Login</Button>}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
