import { Card } from "./ui/card";
import { Button } from "./ui/button";

interface GameCardProps {
  title: string;
  image: string;
  description: string;
}

const GameCard = ({ title, image, description }: GameCardProps) => {
  return (
    <Card className="group overflow-hidden bg-card border-primary/20 hover:border-primary transition-all duration-500 hover:glow-primary hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/20 h-full flex flex-col">
      <div className="relative h-64 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-110 group-hover:rotate-1 transition-all duration-700 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 transform group-hover:translate-y-0 transition-transform duration-500">
          <h3 className="text-2xl font-heading font-black text-primary mb-2 group-hover:text-gradient-primary transition-all duration-300">
            {title}
          </h3>
        </div>
      </div>
      <div className="p-6 space-y-4 flex-1 flex flex-col">
        <p className="text-muted-foreground group-hover:text-foreground transition-colors duration-300">{description}</p>
        <div className="mt-auto">
          <a href="#games">
            <Button variant="outline" className="w-full border-primary/50 hover:bg-primary hover:text-primary-foreground group-hover:border-primary transition-all duration-300">
              View Details
            </Button>
          </a>
        </div>
      </div>
    </Card>
  );
};

export default GameCard;
