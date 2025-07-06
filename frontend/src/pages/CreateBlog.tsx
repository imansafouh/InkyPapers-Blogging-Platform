import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PenTool, Image as ImageIcon, Save, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { blogAPI } from "../lib/api/blog";
import axios from "axios";

const topics = [
  "Technology",
  "Design",
  "Business",
  "Lifestyle",
  "Travel",
  "Food",
  "Health",
  "Science",
];

const CreateBlog = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isPublishing, setIsPublishing] = useState(false);
  const [blogData, setBlogData] = useState({
    title: "",
    // excerpt: "",
    content: "",
    topic: "",
    // image: "",
    // tags: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setBlogData({
      ...blogData,
      [e.target.name]: e.target.value,
    });
  };

  const handleTopicChange = (value: string) => {
    setBlogData({
      ...blogData,
      topic: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!blogData.title || !blogData.content) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    setIsPublishing(true);

    try {
      const response = await blogAPI.create({
        title: blogData.title,
        body: blogData.content,
        // topic: blogData.topic,
      });

      toast({
        title: "Blog Created!",
        description: `Your blog is published!`,
      });

      navigate("/blogs");
    } catch (error: unknown) {
      console.error("Creation error:", error);
      let errorMessage = "Failed to create blog. Please try again.";

      if (axios.isAxiosError(error) && error.response?.data?.message) {
        errorMessage = error.response.data.message;
      }

      toast({
        title: "Blog Creation Failed",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsPublishing(false);
    }
  };

  const handleSaveDraft = () => {
    toast({
      title: "Draft Saved",
      description: "Your blog post has been saved as a draft.",
    });
  };

  const estimateReadTime = (content: string) => {
    const wordsPerMinute = 200;
    const wordCount = content.split(/\s+/).length;
    return Math.ceil(wordCount / wordsPerMinute);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <div className="flex justify-center mb-4">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-3 rounded-full">
            <PenTool className="h-8 w-8 text-white" />
          </div>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
          Create New Blog Post
        </h1>
        <p className="text-gray-600">
          Share your thoughts and insights with the world
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardContent className="p-6 space-y-6">
                {/* Title */}
                <div className="space-y-2">
                  <Label htmlFor="title" className="text-base font-semibold">
                    Title *
                  </Label>
                  <Input
                    id="title"
                    name="title"
                    placeholder="Enter a compelling title for your blog post"
                    value={blogData.title}
                    onChange={handleInputChange}
                    className="text-lg h-12"
                    required
                  />
                </div>

                {/* Excerpt */}
                {/* <div className="space-y-2">
                  <Label htmlFor="excerpt" className="text-base font-semibold">
                    Excerpt
                  </Label>
                  <Textarea
                    id="excerpt"
                    name="excerpt"
                    placeholder="Write a brief description of your blog post (this will appear in the blog listing)"
                    value={blogData.excerpt}
                    onChange={handleInputChange}
                    className="h-20"
                  />
                </div> */}

                {/* Featured Image */}
                {/* <div className="space-y-2">
                  <Label htmlFor="image" className="text-base font-semibold">
                    Featured Image URL
                  </Label>
                  <div className="relative">
                    <ImageIcon className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <Input
                      id="image"
                      name="image"
                      placeholder="https://example.com/image.jpg"
                      value={blogData.image}
                      onChange={handleInputChange}
                      className="pl-10"
                    />
                  </div>
                  {blogData.image && (
                    <div className="mt-2">
                      <img
                        src={blogData.image}
                        alt="Featured image preview"
                        className="w-full h-48 object-cover rounded-lg"
                        onError={(e) => {
                          e.currentTarget.style.display = "none";
                        }}
                      />
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="space-y-2">
                  <Label htmlFor="content" className="text-base font-semibold">
                    Content *
                  </Label>
                  <Textarea
                    id="content"
                    name="content"
                    placeholder="Write your blog content here. You can use HTML tags for formatting."
                    value={blogData.content}
                    onChange={handleInputChange}
                    className="min-h-[400px] font-mono text-sm"
                    required
                  />
                  <div className="text-sm text-gray-500">
                    Estimated read time: {estimateReadTime(blogData.content)}{" "}
                    min
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg">Publish Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Topic */}
                <div className="space-y-2">
                  <Label className="text-sm font-semibold">Topic *</Label>
                  <Select
                    value={blogData.topic}
                    onValueChange={handleTopicChange}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a topic" />
                    </SelectTrigger>
                    <SelectContent>
                      {topics.map((topic) => (
                        <SelectItem key={topic} value={topic}>
                          {topic}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Tags */}
                {/* <div className="space-y-2">
                  <Label htmlFor="tags" className="text-sm font-semibold">
                    Tags
                  </Label>
                  <Input
                    id="tags"
                    name="tags"
                    placeholder="web development, react, javascript"
                    value={blogData.tags}
                    onChange={handleInputChange}
                  />
                  <p className="text-xs text-gray-500">
                    Separate tags with commas
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3 pt-4">
                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                    disabled={isPublishing}
                  >
                    {isPublishing ? (
                      "Publishing..."
                    ) : (
                      <>
                        <Save className="h-4 w-4 mr-2" />
                        Publish Post
                      </>
                    )}
                  </Button>

                  <Button
                    type="button"
                    variant="outline"
                    className="w-full"
                    onClick={handleSaveDraft}
                  >
                    Save as Draft
                  </Button>

                  <Button type="button" variant="ghost" className="w-full">
                    <Eye className="h-4 w-4 mr-2" />
                    Preview
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Writing Tips */}
            <Card className="bg-gradient-to-br from-blue-50 to-purple-50 border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg text-blue-800">
                  Writing Tips
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm text-blue-700">
                <p>• Use a compelling title that grabs attention</p>
                <p>• Write a clear excerpt that summarizes your post</p>
                <p>• Break up long paragraphs for better readability</p>
                <p>• Use headings to structure your content</p>
                <p>• Include relevant images to support your text</p>
                <p>• Proofread before publishing</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateBlog;
