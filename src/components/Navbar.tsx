
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";

const Navbar = () => {
  const { isAuthenticated, logout } = useAuth();

  return (
    <nav className="bg-primary text-primary-foreground shadow-md">
      <div className="container mx-auto px-4 py-4 flex flex-col md:flex-row items-center justify-between">
        <div className="flex items-center mb-4 md:mb-0">
          <Link to="/" className="text-2xl font-bold">
            Team Production
          </Link>
        </div>
        
        <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-4">
          <Link to="/" className="hover:underline">
            Home
          </Link>
          
          {isAuthenticated && (
            <>
              <Link 
                to="/quality" 
                className="hover:underline"
              >
                Quality
              </Link>
              <Link 
                to="/cutting" 
                className="hover:underline"
              >
                Cutting
              </Link>
              <Link 
                to="/stitching" 
                className="hover:underline"
              >
                Stitching
              </Link>
              <Button 
                variant="outline" 
                onClick={logout}
                className="text-white bg-accent hover:bg-accent/90"
              >
                Logout
              </Button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
