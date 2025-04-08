
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useToast } from '@/hooks/use-toast';
import { LogOut, Settings, User } from 'lucide-react';
import AuthModal from './AuthModal';

const UserMenu = () => {
  const { toast } = useToast();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [authModalOpen, setAuthModalOpen] = useState(false);
  
  useEffect(() => {
    // Check if user is logged in on component mount
    const storedUser = localStorage.getItem('carbonSenseUser');
    if (storedUser) {
      try {
        const userData = JSON.parse(storedUser);
        setIsLoggedIn(true);
        setUserEmail(userData.email);
      } catch (error) {
        console.error('Error parsing user data:', error);
        localStorage.removeItem('carbonSenseUser');
      }
    }
  }, []);
  
  const handleLogout = () => {
    localStorage.removeItem('carbonSenseUser');
    setIsLoggedIn(false);
    setUserEmail('');
    toast({
      title: "Logged out",
      description: "You have been successfully logged out."
    });
  };
  
  if (!isLoggedIn) {
    return (
      <AuthModal open={authModalOpen} onOpenChange={setAuthModalOpen}>
        <Button size="sm" variant="outline">
          <User className="h-4 w-4 mr-2" /> Login
        </Button>
      </AuthModal>
    );
  }
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="sm" variant="outline" className="flex items-center gap-2">
          <div className="h-5 w-5 rounded-full bg-cs-green-500 flex items-center justify-center text-white text-xs font-bold">
            {userEmail.charAt(0).toUpperCase()}
          </div>
          <span className="hidden md:inline-block">My Account</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>
          <div className="flex flex-col">
            <span>My Account</span>
            <span className="text-xs text-muted-foreground">{userEmail}</span>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <User className="mr-2 h-4 w-4" /> Profile
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Settings className="mr-2 h-4 w-4" /> Settings
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout} className="text-destructive focus:text-destructive">
          <LogOut className="mr-2 h-4 w-4" /> Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserMenu;
