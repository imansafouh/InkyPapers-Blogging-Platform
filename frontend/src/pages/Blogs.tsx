import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import {
  Calendar,
  Clock,
  User,
  Filter,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { blogAPI } from "../lib/api/blog";
import { Blog, PaginatedResponse } from "../lib/api/types";

const topics = [
  "All",
  "Technology",
  "Design",
  "Business",
  "Health",
  "Travel",
  "Food",
  "Lifestyle",
  "Science",
];

const Blogs = () => {
  const [searchParams] = useSearchParams();
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [filteredBlogs, setFilteredBlogs] = useState<Blog[]>([]);
  const [searchQuery, setSearchQuery] = useState(
    searchParams.get("search") || ""
  );
  const [selectedTopic, setSelectedTopic] = useState(
    searchParams.get("topic") || "All"
  );
  const [sortBy, setSortBy] = useState("newest");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalBlogs, setTotalBlogs] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchAndFilterBlogs = async () => {
      setIsLoading(true);
      try {
        // Build API parameters
        const params: Record<string, string | number> = {
          page: currentPage,
        };

        // Add search parameters if provided
        if (searchQuery) {
          params.title = searchQuery;
        }

        const response = await blogAPI.getAll(params);
        let filtered = response.data;

        // Filter by topic (client-side since API doesn't support topic filtering)
        if (selectedTopic && selectedTopic !== "All") {
          filtered = filtered.filter((blog) =>
            blog.topic.includes(selectedTopic)
          );
        }

        // Sort blogs (client-side since API doesn't support sorting)
        switch (sortBy) {
          case "newest":
            filtered.sort(
              (a, b) =>
                new Date(b.createdAt).getTime() -
                new Date(a.createdAt).getTime()
            );
            break;
          case "oldest":
            filtered.sort(
              (a, b) =>
                new Date(a.createdAt).getTime() -
                new Date(b.createdAt).getTime()
            );
            break;
          case "popular":
            filtered.sort((a, b) => b.likes.length - a.likes.length);
            break;
        }

        setFilteredBlogs(filtered);
        setBlogs(filtered);
        setTotalPages(response.totalPages);
        setTotalBlogs(response.total);
      } catch (error) {
        console.error("Error fetching blogs:", error);
        // Fallback to empty array if API fails
        setFilteredBlogs([]);
        setBlogs([]);
        setTotalPages(1);
        setTotalBlogs(0);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAndFilterBlogs();
  }, [searchQuery, selectedTopic, sortBy, currentPage]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Discover Amazing Stories
        </h1>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          Explore our collection of insightful articles, tutorials, and stories
          from talented writers around the world.
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-8 p-6 bg-white/50 backdrop-blur-sm rounded-lg shadow-sm">
        <div className="flex-1">
          <Input
            placeholder="Search blogs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full"
          />
        </div>

        <Select value={selectedTopic} onValueChange={setSelectedTopic}>
          <SelectTrigger className="w-full md:w-48">
            <SelectValue placeholder="Select topic" />
          </SelectTrigger>
          <SelectContent>
            {topics.map((topic) => (
              <SelectItem key={topic} value={topic}>
                {topic}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-full md:w-48">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="newest">Newest First</SelectItem>
            <SelectItem value="oldest">Oldest First</SelectItem>
            <SelectItem value="popular">Most Popular</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Results count */}
      <div className="mb-6">
        <p className="text-gray-600">
          Showing {filteredBlogs.length}{" "}
          {filteredBlogs.length === 1 ? "article" : "articles"}
          {selectedTopic !== "All" && ` in ${selectedTopic}`}
          {searchQuery && ` matching "${searchQuery}"`}
        </p>
      </div>

      {/* Blog Grid */}
      {isLoading ? (
        <div className="flex justify-center items-center py-12">
          <span className="text-gray-500 text-lg">Loading...</span>
        </div>
      ) : filteredBlogs.length > 0 ? (
        <>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredBlogs.map((blog) => (
              <Card
                key={blog._id}
                className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 bg-white/80 backdrop-blur-sm border-0 shadow-lg"
              >
                <div className="aspect-video overflow-hidden rounded-t-lg bg-gray-200 flex items-center justify-center">
                  <div className="text-gray-500 text-center p-4">
                    <div className="text-4xl mb-2">📝</div>
                    <div className="text-sm">Blog Post</div>
                  </div>
                </div>
                <CardHeader>
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-2">
                    <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs font-medium">
                      {blog.topic[0] || "General"}
                    </span>
                    <div className="flex items-center space-x-1">
                      <Clock className="h-3 w-3" />
                      <span>5 min read</span>
                    </div>
                  </div>
                  <CardTitle className="group-hover:text-blue-600 transition-colors line-clamp-2">
                    <Link to={`/blog/${blog._id}`}>{blog.title}</Link>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {blog.body.substring(0, 150)}...
                  </p>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center space-x-1">
                      <User className="h-3 w-3" />
                      <span>Author</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-3 w-3" />
                      <span>{formatDate(blog.createdAt)}</span>
                    </div>
                  </div>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-sm text-gray-500">
                      {blog.likes.length} likes
                    </span>
                    <Button asChild variant="ghost" size="sm">
                      <Link to={`/blog/${blog._id}`}>Read More</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          {/* Pagination Controls */}
          <div className="flex justify-center items-center gap-4 mt-10">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              aria-label="Previous page"
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>
            <span className="text-gray-700">
              Page {currentPage} of {totalPages}
            </span>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              aria-label="Next page"
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>
        </>
      ) : (
        <div className="text-center py-12">
          <div className="mb-4">
            <Filter className="h-16 w-16 text-gray-300 mx-auto" />
          </div>
          <h3 className="text-xl font-semibold text-gray-600 mb-2">
            No articles found
          </h3>
          <p className="text-gray-500 mb-6">
            Try adjusting your search or filter criteria to find what you're
            looking for.
          </p>
          <Button
            onClick={() => {
              setSearchQuery("");
              setSelectedTopic("All");
            }}
            variant="outline"
          >
            Clear Filters
          </Button>
        </div>
      )}
    </div>
  );
};

export default Blogs;
