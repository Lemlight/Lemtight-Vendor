import Layout from "../components/Layout";
import { Construction } from "lucide-react";

interface PlaceholderProps {
  title: string;
  description: string;
}

export default function Placeholder({ title, description }: PlaceholderProps) {
  return (
    <Layout>
      <div className="flex items-center justify-center min-h-[500px]">
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <Construction className="w-16 h-16 text-gray-400" />
          </div>
          <h1 className="text-3xl font-bold text-foreground">{title}</h1>
          <p className="text-muted-foreground max-w-md">{description}</p>
          <p className="text-sm text-gray-400 pt-4">This page will be built soon. Let us know what features you'd like!</p>
        </div>
      </div>
    </Layout>
  );
}
