import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import GameCard from "@/components/GameCard";
import TeamCard from "@/components/TeamCard";
import Countdown from "@/components/Countdown";
import GoogleFormRedirect from "@/components/GoogleFormRedirect";
import GoogleSheetsTeams from "@/components/GoogleSheetsTeams";
import { Trophy, Users, Calendar, Target, Heart, Shield, FileText, Download, CheckCircle, AlertCircle, DollarSign, Mail, Phone, MapPin } from "lucide-react";
import { useState } from "react";
import heroImage from "@/assets/hero-bg.jpg";
import pubgImage from "@/assets/pubg.jpg";
import codmImage from "@/assets/codm.jpg";
import mlbbImage from "@/assets/mlbb.jpg";
// define Team type locally to avoid any
type Team = { team_name: string; game: string; logo_url?: string };
const Index = () => {
  const [teams, setTeams] = useState<Team[]>([]);
  const [loadingTeams, setLoadingTeams] = useState(true);
  const games = [{
    title: "PUBG MOBILE",
    image: pubgImage,
    description: "Survive, strategize, and dominate the battlefield"
  }, {
    title: "COD MOBILE",
    image: codmImage,
    description: "Fast-paced tactical combat for elite squads"
  }, {
    title: "MOBILE LEGENDS",
    image: mlbbImage,
    description: "MOBA mastery in 5v5 strategic warfare"
  }];
  const gameData = {
    pubg: {
      title: "PUBG MOBILE",
      image: pubgImage,
      prizePool: "45,000 LKR",
      format: "Squad (4 players)",
      duration: "30 minutes per match",
      requirements: "Level 40+, KD ratio 2.0+",
      prizes: {
        first: "22,500 LKR",
        second: "13,500 LKR",
        third: "9,000 LKR"
      }
    },
    codm: {
      title: "COD MOBILE",
      image: codmImage,
      prizePool: "30,000 LKR",
      format: "Team (5 players)",
      duration: "Best of 5 rounds",
      requirements: "Master rank or above",
      prizes: {
        first: "15,000 LKR",
        second: "9,000 LKR",
        third: "6,000 LKR"
      }
    },
    mlbb: {
      title: "MOBILE LEGENDS",
      image: mlbbImage,
      prizePool: "15,000 LKR",
      format: "5v5 Team",
      duration: "Best of 3 matches",
      requirements: "Epic rank minimum",
      prizes: {
        first: "7,500 LKR",
        second: "4,500 LKR",
        third: "3,000 LKR"
      }
    }
  };
  const GameTab = ({
    game
  }: {
    game: keyof typeof gameData;
  }) => {
    const data = gameData[game];
    return <div className="space-y-8">
        <Card className="overflow-hidden border-primary/20">
          <div className="relative h-64 md:h-96">
            <img src={data.image} alt={data.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-8">
              <h2 className="md:text-5xl font-heading font-black text-gradient-primary mb-2 text-2xl">
                {data.title}
              </h2>
              <div className="flex items-center space-x-2 text-gold rounded-sm">
                <Trophy size={24} />
                <span className="text-2xl font-bold text-center">{data.prizePool}</span>
              </div>
            </div>
          </div>

          <div className="p-8 space-y-6">
            <div className="grid md:grid-cols-3 gap-6 items-center justify-items-center">
              <div className="space-y-2">
                <h3 className="text-lg font-heading font-bold text-primary text-center">Format</h3>
                <p className="text-muted-foreground">{data.format}</p>
              </div>
              <div className="space-y-2 text-center">
                <h3 className="text-lg font-heading font-bold text-primary text-center">Duration</h3>
                <p className="text-muted-foreground">{data.duration}</p>
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-heading font-bold text-primary text-center">Requirements</h3>
                <p className="text-muted-foreground">{data.requirements}</p>
              </div>
            </div>

            <div className="border-t border-primary/20 pt-6">
              <h3 className="text-2xl font-heading font-bold text-gradient-accent mb-4 text-center">
                Prize Distribution
              </h3>
              <div className="grid md:grid-cols-3 gap-4">
                <Card className="p-6 bg-gold/10 border-gold/50 text-center">
                  <Trophy className="w-12 h-12 text-gold mx-auto mb-3" />
                  <div className="text-sm text-muted-foreground mb-1">1st Place</div>
                  <div className="text-2xl font-heading font-black text-gold">
                    {data.prizes.first}
                  </div>
                </Card>
                <Card className="p-6 bg-primary/10 border-primary/50 text-center">
                  <Trophy className="w-12 h-12 text-primary mx-auto mb-3" />
                  <div className="text-sm text-muted-foreground mb-1">2nd Place</div>
                  <div className="text-2xl font-heading font-black text-primary">
                    {data.prizes.second}
                  </div>
                </Card>
                <Card className="p-6 bg-accent/10 border-accent/50 text-center">
                  <Trophy className="w-12 h-12 text-accent mx-auto mb-3" />
                  <div className="text-sm text-muted-foreground mb-1">3rd Place</div>
                  <div className="text-2xl font-heading font-black text-accent">
                    {data.prizes.third}
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </Card>
      </div>;
  };

  return <div className="min-h-screen">
      <GoogleSheetsTeams
        onTeamsLoaded={setTeams}
        onLoadingChange={setLoadingTeams}
      />
      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{
        backgroundImage: `url(${heroImage})`
      }}>
          <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background" />
        </div>

        <div className="relative z-10 container mx-auto px-4 text-center space-y-8">
          <div className="space-y-4 animate-in fade-in slide-in-from-bottom duration-700">
            <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-heading font-black leading-tight">
              <span className="text-gradient-primary">TRINITY</span>
              <br />
              <span className="text-gradient-accent">SHOWDOWN</span>
            </h1>
            <p className="text-base sm:text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto px-4">
              The Ultimate Mobile Gaming Tournament
            </p>
            <p className="text-sm sm:text-base md:text-lg text-primary font-bold px-4">
              Presented by Mora eSports Club & Rotaract Club
            </p>
          </div>

          <div className="space-y-6 animate-in fade-in slide-in-from-bottom duration-700 delay-200 px-4">
            <div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-heading font-bold text-primary mb-6">
                Tournament Begins In
              </h2>
              <Countdown />
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a href="#register-form">
                <Button size="lg" className="text-base sm:text-lg px-6 sm:px-8 py-4 sm:py-6 glow-primary animate-glow w-full sm:w-auto">
                  Register Your Team
                </Button>
              </a>
              <a href="#games">
                <Button size="lg" variant="outline" className="text-base sm:text-lg px-6 sm:px-8 py-4 sm:py-6 border-primary/50 w-full sm:w-auto">
                  View Games
                </Button>
              </a>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mt-12 animate-in fade-in slide-in-from-bottom duration-700 delay-300">
            <div className="bg-card/50 backdrop-blur-sm border border-primary/20 rounded-lg p-6">
              <Trophy className="w-12 h-12 text-gold mx-auto mb-3" />
              <div className="text-3xl font-heading font-black text-gold">90,000 LKR</div>
              <div className="text-muted-foreground">Total Prize Pool</div>
            </div>
            <div className="bg-card/50 backdrop-blur-sm border border-primary/20 rounded-lg p-6">
              <Users className="w-12 h-12 text-primary mx-auto mb-3" />
              <div className="text-3xl font-heading font-black text-primary">3</div>
              <div className="text-muted-foreground">Epic Games</div>
            </div>
            <div className="bg-card/50 backdrop-blur-sm border border-primary/20 rounded-lg p-6">
              <Calendar className="w-12 h-12 text-accent mx-auto mb-3" />
              <div className="text-3xl font-heading font-black text-accent">Jan 18</div>
              <div className="text-muted-foreground">2026</div>
            </div>
          </div>
        </div>
      </section>

      {/* Games Showcase */}
      <section className="py-20 bg-gradient-to-b from-background to-card/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 px-4">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-black text-gradient-primary mb-4">
              FEATURED GAMES
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Three legendary titles, one epic tournament
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
            {games.map((game, index) => (
              <div
                key={game.title}
                className="flex animate-in fade-in slide-in-from-bottom duration-700"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex-1 flex">
                  <GameCard {...game} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 px-4">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-black text-gradient-primary mb-6">
              ABOUT TRINITY SHOWDOWN
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              Where passion meets competition in the ultimate mobile gaming experience
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-16 items-stretch">
            <Card className="p-8 border-primary/20 hover:border-primary transition-all flex flex-col items-center justify-center text-center min-h-[280px] h-full">
              <Target className="w-16 h-16 text-primary mb-4 mx-auto" />
              <h2 className="text-2xl font-heading font-bold text-primary mb-4 text-center">Our Mission</h2>
              <p className="text-muted-foreground text-center">
                To create an inclusive platform that celebrates mobile gaming excellence, fostering
                competitive spirit while building a vibrant community of passionate gamers.
              </p>
            </Card>

            <Card className="p-8 border-accent/20 hover:border-accent transition-all flex flex-col items-center justify-center text-center min-h-[280px] h-full">
              <Trophy className="w-16 h-16 text-accent mb-4 mx-auto" />
              <h2 className="text-2xl font-heading font-bold text-accent mb-4 text-center">Our Vision</h2>
              <p className="text-muted-foreground text-center">
                To establish Trinity Showdown as the premier mobile gaming tournament, setting new
                standards for competitive gaming events in the region.
              </p>
            </Card>
          </div>

          <div className="mb-16">
            <h2 className="text-4xl font-heading font-black text-center text-gradient-accent mb-12">
              ORGANIZED BY
            </h2>

            <div className="grid md:grid-cols-2 gap-8">
              <Card className="p-8 border-primary/20">
                <Users className="w-16 h-16 text-primary mb-4 mx-auto" />
                <h3 className="text-2xl font-heading font-bold text-primary mb-4 text-center">
                  Mora eSports Club
                </h3>
                <p className="text-muted-foreground">
                  Leading the charge in competitive gaming, Mora eSports Club has been at the
                  forefront of the gaming community, organizing premier tournaments and fostering
                  talent development in the eSports ecosystem.
                </p>
              </Card>

              <Card className="p-8 border-accent/20">
                <Heart className="w-16 h-16 text-accent mb-4 mx-auto" />
                <h3 className="text-2xl font-heading font-bold text-accent mb-4 text-center">
                  Rotaract Club
                </h3>
                <p className="text-muted-foreground">
                  Committed to youth development and community service, the Rotaract Club brings
                  organizational excellence and a spirit of collaboration to make Trinity Showdown
                  a truly remarkable event.
                </p>
              </Card>
            </div>
          </div>

          <div>
            <h2 className="text-4xl font-heading font-black text-center text-gradient-primary mb-12">
              TOURNAMENT TIMELINE
            </h2>

            <div className="max-w-3xl mx-auto space-y-8">
              {/* Phase 1: Registration */}
              <div className="flex gap-6 items-center">
                <div className="flex-shrink-0 w-24 h-24 rounded-lg bg-primary/20 border-2 border-primary flex items-center justify-center">
                  <span className="text-2xl font-heading font-black text-primary">01</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-heading font-bold text-primary mb-2">Registration Phase</h3>
                  <p className="text-muted-foreground mb-2">December 7 - December 28, 2025</p>
                  <p className="text-muted-foreground">Teams register and submit their rosters for verification</p>
                </div>
              </div>
              {/* Phase 2: Tournament Day */}
              <div className="flex gap-6 items-center">
                <div className="flex-shrink-0 w-24 h-24 rounded-lg bg-gold/20 border-2 border-gold flex items-center justify-center">
                  <span className="text-2xl font-heading font-black text-gold">02</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-heading font-bold text-gold mb-2">Tournament Day</h3>
                  <p className="text-muted-foreground mb-2">January 18, 2026</p>
                  <p className="text-muted-foreground">One day of intense competition across all three games</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Games Section */}
      <section id="games" className="py-20 bg-gradient-to-b from-background to-card/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 px-4">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-black text-gradient-primary mb-6">
              FEATURED GAMES
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              Three legendary titles, one epic tournament. Choose your battlefield.
            </p>
          </div>

          <Tabs defaultValue="pubg" className="w-full">
            <TabsList className="flex w-full max-w-2xl mx-auto mb-12 gap-1">
              <TabsTrigger value="pubg" className="text-sm sm:text-lg font-heading flex-1">
                PUBG
              </TabsTrigger>
              <TabsTrigger value="codm" className="text-sm sm:text-lg font-heading flex-1">
                COD MOBILE
              </TabsTrigger>
              <TabsTrigger value="mlbb" className="text-sm sm:text-lg font-heading flex-1">
                ML:BB
              </TabsTrigger>
            </TabsList>

            <TabsContent value="pubg">
              <GameTab game="pubg" />
            </TabsContent>

            <TabsContent value="codm">
              <GameTab game="codm" />
            </TabsContent>

            <TabsContent value="mlbb">
              <GameTab game="mlbb" />
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Teams Section */}
      <section id="teams" className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 px-4">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-black text-gradient-primary mb-6">
              COMPETING TEAMS
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              Meet the warriors who will battle for glory and ultimate victory
            </p>
          </div>

          <Card className="p-8 md:p-12 border-primary/20 text-center mb-16 bg-card/50 backdrop-blur-sm">
            {loadingTeams ? <div className="text-muted-foreground">Loading teams...</div> : teams.length === 0 ? <>
                <Trophy className="w-24 h-24 text-primary mx-auto mb-6 animate-float" />
                <h2 className="text-3xl font-heading font-bold text-gradient-accent mb-4">
                  Teams Will Be Announced Soon
                </h2>
                <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
                  Registration is currently open! Teams will be announced after approval.
                  Check back here to see all participating teams.
                </p>
                <div className="grid md:grid-cols-3 gap-6 max-w-3xl mx-auto">
                  {[{
                game: "PUBG MOBILE",
                count: 16
              }, {
                game: "COD MOBILE",
                count: 12
              }, {
                game: "MOBILE LEGENDS",
                count: 8
              }].map(item => <div key={item.game} className="bg-background/50 border border-primary/20 rounded-lg p-6">
                      <Users className="w-12 h-12 text-primary mx-auto mb-3" />
                      <div className="text-2xl font-heading font-black text-primary mb-1">
                        {item.count} Slots
                      </div>
                      <div className="text-sm text-muted-foreground">{item.game}</div>
                    </div>)}
                </div>
              </> : <>
                <Trophy className="w-24 h-24 text-primary mx-auto mb-6 animate-float" />
                <h2 className="text-3xl font-heading font-bold text-gradient-accent mb-6">
                  Competing Teams
                </h2>
                <div className="space-y-12">
                  {['PUBG MOBILE', 'COD MOBILE', 'MOBILE LEGENDS'].map(game => {
                const gameTeams = teams.filter(t => t.game === game);
                if (gameTeams.length === 0) return null;
                return <div key={game} className="w-full">
                        <h3 className="text-2xl font-heading font-bold text-primary mb-6 text-center">{game}</h3>
                        {/* Mobile swipe indicator */}
                        <div className="sm:hidden flex items-center justify-center gap-2 mb-4 text-muted-foreground text-sm animate-pulse">
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M5 12h14"/>
                            <path d="m12 5 7 7-7 7"/>
                          </svg>
                          <span>Swipe to view more teams</span>
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M5 12h14"/>
                            <path d="m5 12 7-7 7 7"/>
                          </svg>
                        </div>
                        <Carousel
                          opts={{
                            align: "start",
                            loop: true,
                          }}
                          className="w-full max-w-5xl mx-auto"
                        >
                          <CarouselContent className="-ml-2 md:-ml-4">
                            {gameTeams.map((team, index) => (
                              <CarouselItem key={index} className="pl-2 md:pl-4 basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4">
                                <TeamCard
                                  teamName={team.team_name}
                                  game={game}
                                  logoUrl={team.logo_url}
                                />
                              </CarouselItem>
                            ))}
                          </CarouselContent>
                          <CarouselPrevious className="hidden sm:flex -left-4 md:-left-12" />
                          <CarouselNext className="hidden sm:flex -right-4 md:-right-12" />
                        </Carousel>
                      </div>;
              })}
                </div>
              </>}
          </Card>
        </div>
      </section>

      {/* Rules Section */}
      <section id="rules" className="py-20 bg-gradient-to-b from-background to-card/30">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-16 px-4">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-black text-gradient-primary mb-6">
              RULES & ELIGIBILITY
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground">
              Fair play is the foundation of competitive gaming
            </p>
          </div>

          <Card className="p-8 border-primary/20 mb-8">
            <div className="flex items-center space-x-3 mb-6">
              <Users className="w-8 h-8 text-primary" />
              <h2 className="text-2xl font-heading font-bold text-primary">Eligibility</h2>
            </div>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                <span className="text-muted-foreground">
                  Open to players of all skill levels and regions
                </span>
              </li>
              <li className="flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                <span className="text-muted-foreground">
                  Players must be 16 years or older (with parental consent for 16-18)
                </span>
              </li>
              <li className="flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                <span className="text-muted-foreground">
                  Teams must register with valid in-game IDs and contact information
                </span>
              </li>
              <li className="flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                <span className="text-muted-foreground">
                  Each player can only register with one team per game
                </span>
              </li>
            </ul>
          </Card>

          <Card className="p-8 border-accent/20 mb-8">
            <div className="flex items-center space-x-3 mb-6">
              <Shield className="w-8 h-8 text-accent" />
              <h2 className="text-2xl font-heading font-bold text-accent">Fair Play Policy</h2>
            </div>
            <div className="space-y-4 text-muted-foreground">
              <p>We maintain a strict zero-tolerance policy for cheating and unfair practices:</p>
              <ul className="space-y-3 ml-6">
                <li className="flex items-start space-x-3">
                  <AlertCircle className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
                  <span>
                    <strong className="text-foreground">No Hacking or Modding:</strong> Use of any
                    third-party software, hacks, or game modifications will result in immediate
                    disqualification
                  </span>
                </li>
                <li className="flex items-start space-x-3">
                  <AlertCircle className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
                  <span>
                    <strong className="text-foreground">Account Integrity:</strong> Players must
                    use their registered accounts only. Account sharing is prohibited
                  </span>
                </li>
                <li className="flex items-start space-x-3">
                  <AlertCircle className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
                  <span>
                    <strong className="text-foreground">Fair Competition:</strong> Teaming with
                    opposing players, match-fixing, or intentional throwing is strictly forbidden
                  </span>
                </li>
              </ul>
            </div>
          </Card>

          <Card className="p-8 border-gold/20 mb-8">
            <div className="flex items-center space-x-3 mb-6">
              <FileText className="w-8 h-8 text-gold" />
              <h2 className="text-2xl font-heading font-bold text-gold">Code of Conduct</h2>
            </div>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3">
                <Badge className="bg-gold/20 text-gold border-gold/50 flex-shrink-0">1</Badge>
                <span className="text-muted-foreground">
                  Treat all participants, organizers, and spectators with respect
                </span>
              </li>
              <li className="flex items-start space-x-3">
                <Badge className="bg-gold/20 text-gold border-gold/50 flex-shrink-0">2</Badge>
                <span className="text-muted-foreground">
                  No toxic behavior, harassment, or hate speech will be tolerated
                </span>
              </li>
              <li className="flex items-start space-x-3">
                <Badge className="bg-gold/20 text-gold border-gold/50 flex-shrink-0">3</Badge>
                <span className="text-muted-foreground">
                  Follow instructions from tournament officials and referees at all times
                </span>
              </li>
              <li className="flex items-start space-x-3">
                <Badge className="bg-gold/20 text-gold border-gold/50 flex-shrink-0">4</Badge>
                <span className="text-muted-foreground">
                  Be punctual for all matches and check-ins
                </span>
              </li>
            </ul>
          </Card>

          <div className="grid md:grid-cols-3 gap-6">
            <Card className="p-8 border-primary/20 text-center bg-gradient-primary/10 hover:border-primary transition-all">
              <Download className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-heading font-bold text-primary mb-3">
                PUBG MOBILE
              </h3>
              <p className="text-sm text-muted-foreground mb-6">
                Complete rules and regulations for PUBG tournament
              </p>
              <Button variant="default" className="glow-primary w-full">
                <Download className="mr-2 h-4 w-4" />
                Download Rules
              </Button>
            </Card>

            <Card className="p-8 border-accent/20 text-center bg-gradient-accent/10 hover:border-accent transition-all">
              <Download className="w-12 h-12 text-accent mx-auto mb-4" />
              <h3 className="text-xl font-heading font-bold text-accent mb-3">
                COD MOBILE
              </h3>
              <p className="text-sm text-muted-foreground mb-6">
                Complete rules and regulations for COD tournament
              </p>
              <Button variant="default" className="glow-accent w-full">
                <Download className="mr-2 h-4 w-4" />
                Download Rules
              </Button>
            </Card>

            <Card className="p-8 border-gold/20 text-center bg-gold/10 hover:border-gold transition-all">
              <Download className="w-12 h-12 text-gold mx-auto mb-4" />
              <h3 className="text-xl font-heading font-bold text-gold mb-3">
                MOBILE LEGENDS
              </h3>
              <p className="text-sm text-muted-foreground mb-6">
                Complete rules and regulations for MLBB tournament
              </p>
              <Button variant="default" className="glow-gold w-full">
                <Download className="mr-2 h-4 w-4" />
                Download Rules
              </Button>
            </Card>
          </div>
        </div>
      </section>

      {/* Register Section */}
      <section id="register" className="py-20 bg-background">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-12 px-px">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-black text-gradient-primary mb-6">
              REGISTER NOW
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground mb-8">
              Secure your spot in gaming history. Limited slots available!
            </p>
            <Countdown />
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <Card className="p-6 border-primary/20 text-center">
              <Calendar className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-lg font-heading font-bold text-primary mb-2">Deadline</h3>
              <p className="text-muted-foreground">December 28, 2025</p>
            </Card>

            <Card className="p-6 border-accent/20 text-center">
              <Users className="w-12 h-12 text-accent mx-auto mb-4" />
              <h3 className="text-lg font-heading font-bold text-accent mb-2">Team Size</h3>
              <p className="text-muted-foreground">4-5 Players + 1 Sub</p>
            </Card>

            <Card className="p-6 border-gold/20 text-center">
              <DollarSign className="w-12 h-12 text-gold mx-auto mb-4" />
              <h3 className="text-lg font-heading font-bold text-gold mb-2">Entry Fee</h3>
              <p className="text-muted-foreground">Free Registration</p>
            </Card>
          </div>

          <Card className="p-8 border-primary/20 mb-8">
            <h2 className="text-2xl font-heading font-bold text-gradient-accent mb-6">
              How to Register
            </h2>
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/20 border-2 border-primary flex items-center justify-center">
                  <span className="font-heading font-bold text-primary">1</span>
                </div>
                <div>
                  <h3 className="font-heading font-bold text-primary mb-1">
                    Prepare Your Team Information
                  </h3>
                  <p className="text-muted-foreground">
                    Gather all team members' in-game IDs, contact numbers, and email addresses
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-accent/20 border-2 border-accent flex items-center justify-center">
                  <span className="font-heading font-bold text-accent">2</span>
                </div>
                <div>
                  <h3 className="font-heading font-bold text-accent mb-1">Choose Your Game</h3>
                  <p className="text-muted-foreground">
                    Select which tournament(s) you want to participate in (PUBG, CODM, or MLBB)
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gold/20 border-2 border-gold flex items-center justify-center">
                  <span className="font-heading font-bold text-gold">3</span>
                </div>
                <div>
                  <h3 className="font-heading font-bold text-gold mb-1">
                    Complete the Registration Form
                  </h3>
                  <p className="text-muted-foreground">
                    Fill out the Google Form with accurate information about your team
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/20 border-2 border-primary flex items-center justify-center">
                  <span className="font-heading font-bold text-primary">4</span>
                </div>
                <div>
                  <h3 className="font-heading font-bold text-primary mb-1">
                    Await Confirmation
                  </h3>
                  <p className="text-muted-foreground">
                    You'll receive a confirmation email within 48 hours of registration
                  </p>
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-12 border-primary/20 text-center bg-gradient-primary/10" id="register-form">
            <h2 className="text-3xl font-heading font-black text-gradient-accent mb-4">
              Ready to Compete?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Click the button below to register your team via Google Form
            </p>
            <GoogleFormRedirect />
          </Card>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gradient-to-b from-background to-card/30">
        <div className="container mx-auto max-w-6xl px-4 sm:px-8">
          <div className="text-center mb-16 px-4">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-black text-gradient-primary mb-6 px-[10px]">
              CONTACT US
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Have questions? We're here to help. Reach out to us anytime.
            </p>
          </div>

          <div className="max-w-2xl mx-auto space-y-8">
              <Card className="p-6 sm:p-8 border-primary/20 w-full max-w-[680px] mx-auto lg:max-w-none">
                <h2 className="text-xl sm:text-2xl font-heading font-bold text-primary mb-6">
                  Get In Touch
                </h2>
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <Mail className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-heading font-bold text-primary mb-1">Email</h3>
                      <a href="mailto:contact@trinityshowdown.com" className="text-muted-foreground hover:text-primary transition-colors">
                        contact@trinityshowdown.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <Phone className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-heading font-bold text-accent mb-1">Phone</h3>
                      <a href="tel:+94123456789" className="text-muted-foreground hover:text-accent transition-colors">
                        +94 12 345 6789
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <MapPin className="w-6 h-6 text-gold flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-heading font-bold text-gold mb-1">Location</h3>
                      <p className="text-muted-foreground">
                        University of Moratuwa
                        <br />
                        Katubedda, Sri Lanka
                      </p>
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="p-6 sm:p-8 border-accent/20 w-full max-w-[680px] mx-auto lg:max-w-none">
                <h3 className="text-lg sm:text-xl font-heading font-bold text-accent mb-4 text-center">
                  Tournament Organizers
                </h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-bold text-foreground mb-1 text-center">Mora eSports Club</h4>
                    <p className="text-sm text-muted-foreground text-center">Tournament Operations</p>
                    <a href="mailto:esports@moratuwa.ac.lk" className="text-sm text-primary hover:underline block text-center">
                      esports@moratuwa.ac.lk
                    </a>
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground mb-1 text-center">Rotaract Club</h4>
                    <p className="text-sm text-muted-foreground text-center">Event Management</p>
                    <a href="mailto:rotaract@moratuwa.ac.lk" className="text-sm text-accent hover:underline block text-center">
                      rotaract@moratuwa.ac.lk
                    </a>
                  </div>
                </div>
              </Card>
          </div>
        </div>
      </section>
    </div>;
};
export default Index;

