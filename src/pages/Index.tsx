
import { useAuth } from "@/context/AuthContext";
import LoginForm from "@/components/LoginForm";
import Navbar from "@/components/Navbar";

const Index = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="order-2 md:order-1">
            <h1 className="text-4xl font-bold mb-4">
              Textile Production Management
            </h1>
            <p className="text-xl text-gray-600 mb-6">
              Streamline your production process with our comprehensive tracking system.
              Monitor quality control, cutting operations, and stitching processes in one place.
            </p>
            
            {!isAuthenticated && (
              <div className="md:hidden">
                <LoginForm />
              </div>
            )}
            
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-primary/10 p-6 rounded-lg">
                <h3 className="text-lg font-semibold mb-2">Quality Control</h3>
                <p>Verify materials, upload photos, and document quality issues.</p>
              </div>
              <div className="bg-primary/10 p-6 rounded-lg">
                <h3 className="text-lg font-semibold mb-2">Cutting Management</h3>
                <p>Track cutting progress by size, color, and quantity.</p>
              </div>
              <div className="bg-primary/10 p-6 rounded-lg">
                <h3 className="text-lg font-semibold mb-2">Stitching Process</h3>
                <p>Assign tailors, monitor production status, and record completion.</p>
              </div>
            </div>
          </div>
          
          <div className="order-1 md:order-2">
            <div className="bg-gray-200 h-64 md:h-80 rounded-lg mb-6 flex items-center justify-center">
              <p className="text-gray-500">Production Line Image</p>
            </div>
            
            {!isAuthenticated && (
              <div className="hidden md:block">
                <LoginForm />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
