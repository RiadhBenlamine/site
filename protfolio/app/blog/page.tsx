// app/blog/page.tsx
"use client";

import { Card, CardBody, CardFooter, Chip, Image, Link, Spinner } from "@heroui/react";
import { Calendar, Clock, ExternalLink, BookOpen } from "lucide-react";
import { useEffect, useState, useRef } from "react";

interface BlogPost {
    title: string;
    link: string;
    pubDate: string;
    author: string;
    thumbnail: string;
    description: string;
    categories: string[];
    guid: string;
}

function BlogCard({ post, index }: { post: BlogPost; index: number }) {
    const [isVisible, setIsVisible] = useState(false);
    const [imageError, setImageError] = useState(false);
    const cardRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.1 }
        );

        if (cardRef.current) {
            observer.observe(cardRef.current);
        }

        return () => {
            if (cardRef.current) {
                observer.unobserve(cardRef.current);
            }
        };
    }, []);

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
        });
    };

    const getReadingTime = (description: string) => {
        const words = description.split(" ").length;
        const minutes = Math.ceil(words / 200);
        return `${minutes} min read`;
    };

    // Extract image from description/content if thumbnail is not available
    const getImageUrl = () => {
        if (post.thumbnail) return post.thumbnail;

        // Try to extract image from description/content
        const imgRegex = /<img[^>]+src="([^">]+)"/g;
        const match = imgRegex.exec(post.description);
        if (match && match[1]) {
            return match[1];
        }

        return null;
    };

    const imageUrl = getImageUrl();

    return (
        <div
            ref={cardRef}
            className={`transition-all duration-700 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
            style={{ transitionDelay: `${index * 100}ms` }}
        >
            <Card className="border-none bg-background/60 dark:bg-default-100/50 hover:scale-105 hover:shadow-lg hover:shadow-primary/20 transition-all duration-300 h-full group">
                {/* Thumbnail */}
                <CardBody className="p-0 overflow-hidden">
                    <div className="relative w-full h-48 bg-gradient-to-br from-primary/20 to-primary/5 overflow-hidden">
                        {imageUrl && !imageError ? (
                            <Image
                                alt={post.title}
                                className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                                src={imageUrl}
                                onError={() => setImageError(true)}
                                removeWrapper
                            />
                        ) : (
                            <div className="w-full h-48 flex items-center justify-center bg-gradient-to-br from-primary/10 to-primary/5">
                                <BookOpen className="w-16 h-16 text-primary/40 group-hover:scale-110 transition-transform duration-500" />
                            </div>
                        )}
                        {/* Overlay gradient on hover */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                </CardBody>

                <CardBody className="p-6 gap-4">
                    {/* Meta info */}
                    <div className="flex flex-wrap gap-2 items-center text-xs text-default-500">
                        <div className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            <span>{formatDate(post.pubDate)}</span>
                        </div>
                        <span>•</span>
                        <div className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            <span>{getReadingTime(post.description)}</span>
                        </div>
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-bold line-clamp-2 group-hover:text-primary transition-colors">
                        {post.title}
                    </h3>

                    {/* Description */}
                    <p className="text-sm text-default-500 line-clamp-3">
                        {post.description.replace(/<[^>]*>/g, "").substring(0, 150)}...
                    </p>

                    {/* Categories */}
                    {post.categories && post.categories.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                            {post.categories.slice(0, 3).map((category, i) => (
                                <Chip key={i} size="sm" variant="flat" color="primary">
                                    {category}
                                </Chip>
                            ))}
                        </div>
                    )}
                </CardBody>

                {/* Footer */}
                <CardFooter className="p-6 pt-0">
                    <Link
                        href={post.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-primary hover:gap-3 transition-all font-medium"
                    >
                        <span>Read on Medium</span>
                        <ExternalLink className="w-4 h-4" />
                    </Link>
                </CardFooter>
            </Card>
        </div>
    );
}

export default function Blog() {
    const [posts, setPosts] = useState<BlogPost[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [headerVisible, setHeaderVisible] = useState(false);
    const headerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setHeaderVisible(true);
                }
            },
            { threshold: 0.1 }
        );

        if (headerRef.current) {
            observer.observe(headerRef.current);
        }

        return () => {
            if (headerRef.current) {
                observer.unobserve(headerRef.current);
            }
        };
    }, []);

    useEffect(() => {
        const fetchMediumPosts = async () => {
            try {
                const mediumUsername = "@rbn0x00";
                const rssUrl = `https://medium.com/feed/${mediumUsername}`;

                // Using RSS2JSON service to convert RSS to JSON
                const response = await fetch(
                    `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(
                        rssUrl
                    )}` // You can get a free API key from rss2json.com for better rate limits
                );

                if (!response.ok) {
                    throw new Error("Failed to fetch posts");
                }

                const data = await response.json();

                if (data.status === "ok") {
                    const formattedPosts: BlogPost[] = data.items.map((item: any) => ({
                        title: item.title,
                        link: item.link,
                        pubDate: item.pubDate,
                        author: item.author,
                        thumbnail: item.thumbnail || extractImageFromContent(item.content || item.description),
                        description: item.description || item.content,
                        categories: item.categories || [],
                        guid: item.guid,
                    }));

                    setPosts(formattedPosts);
                } else {
                    throw new Error("Invalid response from RSS feed");
                }
            } catch (err) {
                setError("Failed to load blog posts. Please try again later.");
                console.error("Error fetching Medium posts:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchMediumPosts();
    }, []);

    // Helper function to extract image from HTML content
    const extractImageFromContent = (content: string): string => {
        const imgRegex = /<img[^>]+src="([^">]+)"/;
        const match = imgRegex.exec(content);
        return match && match[1] ? match[1] : "";
    };

    return (
        <section className="container mx-auto px-6 py-20 relative overflow-hidden min-h-screen">
            {/* Animated background gradient */}
            <div className="absolute inset-0 -z-10">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse delay-1000" />
            </div>

            <div className="space-y-12">
                {/* Header */}
                <div
                    ref={headerRef}
                    className={`text-center space-y-4 transition-all duration-1000 ${
                        headerVisible
                            ? "opacity-100 translate-y-0"
                            : "opacity-0 -translate-y-10"
                    }`}
                >
                    <Chip color="primary" variant="dot" size="lg">
                        BLOG & ARTICLES
                    </Chip>
                    <h2 className="text-4xl md:text-6xl font-bold">
                        Latest <span className="text-primary">Posts</span>
                    </h2>
                    <p className="text-lg text-default-500 max-w-2xl mx-auto">
                        Security research, CTF writeups, and technical articles about cybersecurity
                    </p>
                </div>

                {/* Loading State */}
                {loading && (
                    <div className="flex justify-center items-center py-20">
                        <Spinner size="lg" color="primary" />
                    </div>
                )}

                {/* Error State */}
                {error && (
                    <div className="text-center py-20">
                        <p className="text-danger text-lg">{error}</p>
                    </div>
                )}

                {/* Posts Grid */}
                {!loading && !error && posts.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {posts.map((post, index) => (
                            <BlogCard key={post.guid} post={post} index={index} />
                        ))}
                    </div>
                )}

                {/* Empty State */}
                {!loading && !error && posts.length === 0 && (
                    <div className="text-center py-20">
                        <BookOpen className="w-20 h-20 text-default-300 mx-auto mb-4" />
                        <p className="text-default-500 text-lg">No posts found</p>
                    </div>
                )}

                {/* Stats */}
                {!loading && !error && posts.length > 0 && (
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-3xl mx-auto pt-8">
                        <div className="text-center p-6 bg-background/60 dark:bg-default-100/50 rounded-lg hover:scale-105 transition-all duration-300">
                            <div className="text-3xl md:text-4xl font-bold text-primary">
                                {posts.length}
                            </div>
                            <div className="text-sm text-default-500 mt-2">Total Posts</div>
                        </div>

                        <div className="text-center p-6 bg-background/60 dark:bg-default-100/50 rounded-lg hover:scale-105 transition-all duration-300">
                            <div className="text-3xl md:text-4xl font-bold text-primary">
                                {new Set(posts.flatMap((p) => p.categories)).size}
                            </div>
                            <div className="text-sm text-default-500 mt-2">Categories</div>
                        </div>

                        <div className="text-center p-6 bg-background/60 dark:bg-default-100/50 rounded-lg hover:scale-105 transition-all duration-300 col-span-2 md:col-span-1">
                            <div className="text-3xl md:text-4xl font-bold text-primary">
                                {posts[0] ? formatDate(posts[0].pubDate) : "N/A"}
                            </div>
                            <div className="text-sm text-default-500 mt-2">Latest Post</div>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
}

function formatDate(dateString: string) {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
    });
}