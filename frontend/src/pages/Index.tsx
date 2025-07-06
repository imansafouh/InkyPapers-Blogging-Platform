import { Link } from "react-router-dom";
import { ArrowRight, TrendingUp, Users, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { Blog } from "../lib/api/types";
import { blogAPI } from "../lib/api/blog";

const Index = () => {
  const [featuredBlogs, setBlogs] = useState<Blog[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchAndFilterBlogs = async () => {
      setIsLoading(true);
      try {
        // Build API parameters
        const params: Record<string, string | number> = {
          page: 1,
          limit: 3,
          sort: "createdAt:desc",
        };

        const response = await blogAPI.getAll(params);
        const filtered = response.data;

        setBlogs(filtered);
      } catch (error) {
        console.error("Error fetching blogs:", error);
        // Fallback to empty array if API fails
        setBlogs([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAndFilterBlogs();
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent">
            Share Your Stories,
            <br />
            Inspire the World
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Join a community of passionate writers and readers. Create,
            discover, and engage with content that matters.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            >
              <Link to="/create" className="flex items-center space-x-2">
                <span>Start Writing</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link to="/blogs">Explore Blogs</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 bg-white/50 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <BookOpen className="h-12 w-12 text-blue-600" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-2">1,000+</h3>
              <p className="text-gray-600">Published Articles</p>
            </div>
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <Users className="h-12 w-12 text-purple-600" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-2">500+</h3>
              <p className="text-gray-600">Active Writers</p>
            </div>
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <TrendingUp className="h-12 w-12 text-green-600" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-2">10k+</h3>
              <p className="text-gray-600">Monthly Readers</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Blogs Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Featured Stories
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover the most engaging and insightful articles from our
              community of writers.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredBlogs.map((blog) => (
              <Card
                key={blog._id}
                className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 bg-white/80 backdrop-blur-sm border-0 shadow-lg"
              >
                <div className="aspect-video overflow-hidden rounded-t-lg">
                  <img
                    // src={blog.image}
                    alt={blog.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardHeader>
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-2">
                    <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs font-medium">
                      {blog.topic}
                    </span>
                    <span>{"5 min. read"}</span>
                  </div>
                  <CardTitle className="group-hover:text-blue-600 transition-colors">
                    <Link to={`/blog/${blog._id}`}>{blog.title}</Link>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {/* <p className="text-gray-600 mb-4 line-clamp-3">
                    {blog.excerpt}
                  </p> */}
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span>By {blog.userId}</span>
                    <span>{formatDate(blog.createdAt)}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button asChild size="lg" variant="outline">
              <Link to="/blogs">View All Blogs</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Share Your Voice?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of writers who are already sharing their stories and
            building their audience.
          </p>
          <Button asChild size="lg" variant="secondary">
            <Link to="/signup">Get Started Today</Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Index;
