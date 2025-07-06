
import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Calendar, Clock, User, Heart, MessageCircle, Share2, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";

// Mock blog data
const mockBlog = {
  id: 1,
  title: "The Future of Web Development: Trends and Technologies Shaping Tomorrow",
  content: `
    <p>The web development landscape is evolving at an unprecedented pace. As we move forward, several key trends and technologies are emerging that will fundamentally change how we build and interact with web applications.</p>
    
    <h2>1. Artificial Intelligence Integration</h2>
    <p>AI is no longer just a buzzword—it's becoming an integral part of web development. From automated code generation to intelligent user experience optimization, AI tools are revolutionizing how developers work.</p>
    
    <h2>2. Progressive Web Applications (PWAs)</h2>
    <p>PWAs continue to bridge the gap between web and native applications. With improved offline capabilities and native-like performance, they're becoming the preferred choice for many businesses.</p>
    
    <h2>3. WebAssembly (WASM)</h2>
    <p>WebAssembly is opening new possibilities for web applications by allowing high-performance code written in languages like C, C++, and Rust to run in the browser at near-native speed.</p>
    
    <h2>4. Serverless Architecture</h2>
    <p>The serverless approach is gaining momentum, allowing developers to focus on writing code without worrying about infrastructure management. This leads to faster development cycles and better scalability.</p>
    
    <h2>Conclusion</h2>
    <p>The future of web development is exciting and full of possibilities. By staying updated with these trends and continuously learning, developers can create more efficient, powerful, and user-friendly applications.</p>
  `,
  author: "Jane Smith",
  authorBio: "Senior Full-Stack Developer with 8+ years of experience in modern web technologies.",
  authorAvatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&q=80",
  date: "2024-03-15",
  topic: "Technology",
  readTime: "8 min read",
  image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&q=80",
  likes: 42,
  isLiked: false
};

// Mock comments data
const mockComments = [
  {
    id: 1,
    author: "Alex Johnson",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&q=80",
    content: "Great article! The section on WebAssembly was particularly insightful. I've been experimenting with WASM for performance-critical parts of our application.",
    date: "2024-03-16",
    likes: 5,
    replies: [
      {
        id: 11,
        author: "Jane Smith",
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&q=80",
        content: "Thanks Alex! I'd love to hear more about your WASM experiments. How significant were the performance improvements?",
        date: "2024-03-16",
        likes: 2
      }
    ]
  },
  {
    id: 2,
    author: "Sarah Chen",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&q=80",
    content: "The serverless section really resonated with me. We recently migrated our backend to a serverless architecture and the benefits have been tremendous.",
    date: "2024-03-16",
    likes: 3,
    replies: []
  },
  {
    id: 3,
    author: "Mike Wilson",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&q=80",
    content: "PWAs are definitely the future. The offline capabilities and performance improvements make them a game-changer for user experience.",
    date: "2024-03-17",
    likes: 7,
    replies: []
  }
];

const BlogDetail = () => {
  const { id } = useParams();
  const [blog] = useState(mockBlog);
  const [comments, setComments] = useState(mockComments);
  const [newComment, setNewComment] = useState("");
  const [isLiked, setIsLiked] = useState(blog.isLiked);
  const [likesCount, setLikesCount] = useState(blog.likes);
  const { toast } = useToast();

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikesCount(isLiked ? likesCount - 1 : likesCount + 1);
  };

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const comment = {
      id: comments.length + 1,
      author: "Current User",
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&q=80",
      content: newComment,
      date: new Date().toISOString().split('T')[0],
      likes: 0,
      replies: []
    };

    setComments([comment, ...comments]);
    setNewComment("");
    toast({
      title: "Comment Posted!",
      description: "Your comment has been added successfully.",
    });
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric"
    });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Back Button */}
      <Button variant="ghost" asChild className="mb-6">
        <Link to="/blogs" className="flex items-center space-x-2">
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Blogs</span>
        </Link>
      </Button>

      {/* Article Header */}
      <article className="bg-white/80 backdrop-blur-sm rounded-lg shadow-lg overflow-hidden mb-8">
        <div className="aspect-video overflow-hidden">
          <img
            src={blog.image}
            alt={blog.title}
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="p-8">
          <div className="flex items-center space-x-4 mb-6">
            <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
              {blog.topic}
            </span>
            <div className="flex items-center text-gray-500 text-sm space-x-4">
              <div className="flex items-center space-x-1">
                <Calendar className="h-4 w-4" />
                <span>{formatDate(blog.date)}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Clock className="h-4 w-4" />
                <span>{blog.readTime}</span>
              </div>
            </div>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight">
            {blog.title}
          </h1>

          {/* Author Info */}
          <div className="flex items-center space-x-4 mb-8 pb-8 border-b border-gray-200">
            <Avatar className="h-12 w-12">
              <AvatarImage src={blog.authorAvatar} alt={blog.author} />
              <AvatarFallback>{blog.author.split(' ').map(n => n[0]).join('')}</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold text-gray-900">{blog.author}</h3>
              <p className="text-gray-600 text-sm">{blog.authorBio}</p>
            </div>
          </div>

          {/* Article Content */}
          <div 
            className="prose prose-lg max-w-none text-gray-700 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />

          {/* Article Actions */}
          <div className="flex items-center justify-between pt-8 mt-8 border-t border-gray-200">
            <div className="flex items-center space-x-4">
              <Button
                variant={isLiked ? "default" : "outline"}
                size="sm"
                onClick={handleLike}
                className="flex items-center space-x-2"
              >
                <Heart className={`h-4 w-4 ${isLiked ? 'fill-current' : ''}`} />
                <span>{likesCount}</span>
              </Button>
              
              <Button variant="outline" size="sm" className="flex items-center space-x-2">
                <MessageCircle className="h-4 w-4" />
                <span>{comments.length}</span>
              </Button>
            </div>

            <Button variant="outline" size="sm" className="flex items-center space-x-2">
              <Share2 className="h-4 w-4" />
              <span>Share</span>
            </Button>
          </div>
        </div>
      </article>

      {/* Comments Section */}
      <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
        <CardHeader>
          <h2 className="text-2xl font-bold text-gray-900">
            Comments ({comments.length})
          </h2>
        </CardHeader>
        <CardContent>
          {/* Comment Form */}
          <form onSubmit={handleCommentSubmit} className="mb-8">
            <Textarea
              placeholder="Share your thoughts about this article..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="mb-4 min-h-[100px]"
            />
            <Button type="submit" disabled={!newComment.trim()}>
              Post Comment
            </Button>
          </form>

          {/* Comments List */}
          <div className="space-y-6">
            {comments.map((comment) => (
              <div key={comment.id} className="border-b border-gray-200 pb-6 last:border-b-0">
                <div className="flex space-x-4">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={comment.avatar} alt={comment.author} />
                    <AvatarFallback>{comment.author.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h4 className="font-semibold text-gray-900">{comment.author}</h4>
                      <span className="text-gray-500 text-sm">{formatDate(comment.date)}</span>
                    </div>
                    <p className="text-gray-700 mb-3">{comment.content}</p>
                    <div className="flex items-center space-x-4">
                      <Button variant="ghost" size="sm" className="text-gray-500 hover:text-gray-700">
                        <Heart className="h-3 w-3 mr-1" />
                        {comment.likes}
                      </Button>
                      <Button variant="ghost" size="sm" className="text-gray-500 hover:text-gray-700">
                        Reply
                      </Button>
                    </div>

                    {/* Replies */}
                    {comment.replies && comment.replies.length > 0 && (
                      <div className="mt-4 ml-6 space-y-4">
                        {comment.replies.map((reply) => (
                          <div key={reply.id} className="flex space-x-3">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={reply.avatar} alt={reply.author} />
                              <AvatarFallback>{reply.author.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="flex items-center space-x-2 mb-1">
                                <h5 className="font-medium text-gray-900 text-sm">{reply.author}</h5>
                                <span className="text-gray-500 text-xs">{formatDate(reply.date)}</span>
                              </div>
                              <p className="text-gray-700 text-sm">{reply.content}</p>
                              <Button variant="ghost" size="sm" className="text-gray-500 hover:text-gray-700 mt-1">
                                <Heart className="h-3 w-3 mr-1" />
                                {reply.likes}
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {comments.length === 0 && (
            <div className="text-center py-8">
              <MessageCircle className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">No comments yet. Be the first to share your thoughts!</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default BlogDetail;
