import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Search,
  Menu,
  X,
  PenTool,
  User,
  LogIn,
  UserPlus,
  LogOut,
  Settings,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { getUser, logout } from "@/lib/api/auth-helpers";
import { topicApi } from "../lib/api/topic";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [topics, setTopics] = useState<string[]>([]);

  useEffect(() => {
    // Fetch topics from API (assuming you have a topic API)
    const fetchTopics = async () => {
      try {
        const response = await topicApi.getAll({
          limit: 7, // Adjust as needed
          page: 1,
        });
        const data = response.data;
        setTopics(data.map((topic: { name: string }) => topic.name));
      } catch (error) {
        console.error("Error fetching topics:", error);
      }
    };

    fetchTopics();
  }, []);

  const navigate = useNavigate();

  // Get current user
  const currentUser = getUser();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/blogs?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <nav className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <PenTool className="h-8 w-8 text-blue-600" />
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              InkyPapers
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className="text-gray-700 hover:text-blue-600 transition-colors"
            >
              Home
            </Link>
            <Link
              to="/blogs"
              className="text-gray-700 hover:text-blue-600 transition-colors"
            >
              Blogs
            </Link>

            {/* Topics Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger className="text-gray-700 hover:text-blue-600 transition-colors">
                Topics
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-white border border-gray-200 shadow-lg z-50">
                {topics.map((topic) => (
                  <DropdownMenuItem key={topic} asChild>
                    <Link
                      to={`/blogs?topic=${encodeURIComponent(topic)}`}
                      className="cursor-pointer hover:bg-blue-50"
                    >
                      {topic}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Search */}
            <form onSubmit={handleSearch} className="flex items-center">
              <div className="relative">
                <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search blogs..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 w-64 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
            </form>

            {/* Auth Buttons / User Menu */}
            <div className="flex items-center space-x-4">
              {currentUser ? (
                <>
                  <Button asChild variant="ghost">
                    <Link to="/create" className="flex items-center space-x-2">
                      <PenTool className="h-4 w-4" />
                      <span>Write</span>
                    </Link>
                  </Button>

                  {/* User Dropdown */}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        className="flex items-center space-x-2"
                      >
                        <User className="h-4 w-4" />
                        <span>Welcome, {currentUser.name}</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="bg-white border border-gray-200 shadow-lg z-50">
                      <DropdownMenuItem asChild>
                        <Link
                          to="/profile"
                          className="flex items-center space-x-2 cursor-pointer"
                        >
                          <User className="h-4 w-4" />
                          <span>Profile</span>
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link
                          to="/settings"
                          className="flex items-center space-x-2 cursor-pointer"
                        >
                          <Settings className="h-4 w-4" />
                          <span>Settings</span>
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        onClick={handleLogout}
                        className="flex items-center space-x-2 cursor-pointer text-red-600 hover:text-red-700"
                      >
                        <LogOut className="h-4 w-4" />
                        <span>Logout</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </>
              ) : (
                <>
                  <Button variant="outline" asChild>
                    <Link to="/login" className="flex items-center space-x-2">
                      <LogIn className="h-4 w-4" />
                      <span>Login</span>
                    </Link>
                  </Button>
                  <Button
                    asChild
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                  >
                    <Link to="/signup" className="flex items-center space-x-2">
                      <UserPlus className="h-4 w-4" />
                      <span>Sign Up</span>
                    </Link>
                  </Button>
                </>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 space-y-4 border-t border-gray-200">
            <Link
              to="/"
              className="block text-gray-700 hover:text-blue-600 transition-colors"
            >
              Home
            </Link>
            <Link
              to="/blogs"
              className="block text-gray-700 hover:text-blue-600 transition-colors"
            >
              Blogs
            </Link>
            <div className="space-y-2">
              <p className="text-sm font-medium text-gray-500">Topics</p>
              {topics.map((topic) => (
                <Link
                  key={topic}
                  to={`/blogs?topic=${encodeURIComponent(topic)}`}
                  className="block pl-4 text-gray-600 hover:text-blue-600 transition-colors"
                >
                  {topic}
                </Link>
              ))}
            </div>
            <form onSubmit={handleSearch} className="pt-2">
              <div className="relative">
                <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search blogs..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 w-full"
                />
              </div>
            </form>
            <div className="flex flex-col space-y-2 pt-4">
              {currentUser ? (
                <>
                  <div className="flex items-center space-x-2 p-2 bg-gray-50 rounded-lg">
                    <User className="h-4 w-4 text-blue-600" />
                    <span className="text-sm font-medium">
                      Welcome, {currentUser.name}
                    </span>
                  </div>
                  <Button variant="ghost" asChild>
                    <Link to="/create">Write</Link>
                  </Button>
                  <Button variant="ghost" asChild>
                    <Link to="/profile">Profile</Link>
                  </Button>
                  <Button variant="ghost" asChild>
                    <Link to="/settings">Settings</Link>
                  </Button>
                  <Button
                    variant="ghost"
                    onClick={handleLogout}
                    className="text-red-600 hover:text-red-700"
                  >
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Button variant="outline" asChild>
                    <Link to="/login">Login</Link>
                  </Button>
                  <Button asChild>
                    <Link to="/signup">Sign Up</Link>
                  </Button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
