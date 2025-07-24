import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Copy, Link, Check, ExternalLink } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const URLShortener = () => {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const validateUrl = (url: string) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const generateShortCode = () => {
    return Math.random().toString(36).substring(2, 8);
  };

  const handleShorten = async () => {
    if (!url.trim()) {
      toast({
        title: "Error",
        description: "Please enter a URL to shorten",
        variant: "destructive",
      });
      return;
    }

    if (!validateUrl(url)) {
      toast({
        title: "Invalid URL",
        description: "Please enter a valid URL (include http:// or https://)",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const shortCode = generateShortCode();
    const shortened = `https://short.ly/${shortCode}`;
    setShortUrl(shortened);
    setIsLoading(false);

    toast({
      title: "Success!",
      description: "URL shortened successfully",
    });
  };

  const handleCopy = async () => {
    if (!shortUrl) return;
    
    try {
      await navigator.clipboard.writeText(shortUrl);
      setCopied(true);
      toast({
        title: "Copied!",
        description: "Short URL copied to clipboard",
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to copy URL",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-2xl space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Link className="h-8 w-8 text-primary" />
            <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              QuickLink
            </h1>
          </div>
          <p className="text-xl text-muted-foreground">
            Transform long URLs into short, shareable links instantly
          </p>
        </div>

        {/* Main Card */}
        <Card className="border border-border shadow-card backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-center text-2xl">Shorten Your URL</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* URL Input */}
            <div className="space-y-4">
              <div className="relative">
                <Input
                  type="url"
                  placeholder="Enter your long URL here..."
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  className="pl-4 pr-4 py-6 text-lg bg-input/50 border-border focus:border-primary transition-colors"
                />
              </div>
              
              <Button
                onClick={handleShorten}
                disabled={isLoading}
                className="w-full py-6 text-lg font-semibold bg-gradient-primary hover:shadow-glow transition-all duration-300 hover:scale-[1.02]"
              >
                {isLoading ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
                    <span>Shortening...</span>
                  </div>
                ) : (
                  "Shorten URL"
                )}
              </Button>
            </div>

            {/* Result */}
            {shortUrl && (
              <div className="space-y-4 animate-slide-up">
                <div className="p-4 bg-card border border-border rounded-lg">
                  <p className="text-sm text-muted-foreground mb-2">Your shortened URL:</p>
                  <div className="flex items-center space-x-2">
                    <Input
                      readOnly
                      value={shortUrl}
                      className="flex-1 bg-background"
                    />
                    <Button
                      onClick={handleCopy}
                      variant="outline"
                      size="icon"
                      className="h-10 w-10 hover:shadow-glow transition-all duration-300"
                    >
                      {copied ? (
                        <Check className="h-4 w-4 text-green-500" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </Button>
                    <Button
                      onClick={() => window.open(url, '_blank')}
                      variant="outline"
                      size="icon"
                      className="h-10 w-10 hover:shadow-glow transition-all duration-300"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
          <div className="p-4">
            <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-2">
              <Link className="h-6 w-6 text-primary-foreground" />
            </div>
            <h3 className="font-semibold text-foreground">Instant Shortening</h3>
            <p className="text-sm text-muted-foreground">Create short links in seconds</p>
          </div>
          <div className="p-4">
            <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-2">
              <Copy className="h-6 w-6 text-primary-foreground" />
            </div>
            <h3 className="font-semibold text-foreground">Easy Sharing</h3>
            <p className="text-sm text-muted-foreground">Copy and share with one click</p>
          </div>
          <div className="p-4">
            <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-2">
              <ExternalLink className="h-6 w-6 text-primary-foreground" />
            </div>
            <h3 className="font-semibold text-foreground">Safe & Reliable</h3>
            <p className="text-sm text-muted-foreground">Secure and always accessible</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default URLShortener;