import {Button} from "@/components/ui/button";
import {Card} from "@/components/ui/card";
import {Badge} from "@/components/ui/badge";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
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
import {
    Trophy,
    Users,
    Calendar,
    Target,
    Heart,
    Shield,
    FileText,
    Download,
    CheckCircle,
    AlertCircle,
    DollarSign,
    Mail,
    Phone,
    MapPin
} from "lucide-react";
import {useState} from "react";
import heroImage from "@/assets/bg.jpg";
import pubgImage from "@/assets/pubg-bg-min.jpg";
import codmImage from "@/assets/cod-bg-min.jpg";
import mlbbImage from "@/assets/mb-bg.jpg";
// define Team type locally to avoid any
type Team = { team_name: string; game: string; logo_url?: string };
const Index = () => {
    const [teams, setTeams] = useState<Team[]>([]);
    const [loadingTeams, setLoadingTeams] = useState(true);
    const games = [{
        title: "PUBG MOBILE",
        image: pubgImage,
        description: "A tactical battle royale where survival, skill, and strategy decide the last team standing"
    }, {
        title: "COD MOBILE",
        image: codmImage,
        description: "A fast-paced shooter where sharp aim, teamwork, and quick decisions lead to victory"
    }, {
        title: "MOBILE LEGENDS",
        image: mlbbImage,
        description: "A competitive MOBA where teamwork, strategy, and hero mastery define victory"
    }];
    const gameData = {
        pubg: {
            title: "PUBG MOBILE",
            image: pubgImage,
            prizePool: "30,000 LKR",
            format: "Squad (4 players)",
            duration: "30 minutes per match",
            requirements: "Level 40+, KD ratio 2.0+",
            prizes: {
                first: "15,000 LKR",
                second: "10,000 LKR",
                third: "5,000 LKR"
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
                second: "10,000 LKR",
                third: "5,000 LKR"
            }
        },
        mlbb: {
            title: "MOBILE LEGENDS",
            image: mlbbImage,
            prizePool: "30,000 LKR",
            format: "Team (5 players)",
            duration: "Best of 3 matches",
            requirements: "Epic rank minimum",
            prizes: {
                first: "15,000 LKR",
                second: "10,000 LKR",
                third: "5,000 LKR"
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
                    <img src={data.image} alt={data.title}
                         className={`w-full h-full object-cover ${data.title == 'PUBG MOBILE' || data.title == 'COD MOBILE' ? 'object-top' : ''}`}/>
                    <div
                        className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent"/>
                    <div className="absolute bottom-0 left-0 right-0 p-8">
                        <h2 className="md:text-5xl font-heading font-black text-gradient-primary mb-2 text-2xl">
                            {data.title}
                        </h2>
                        <div className="hidden items-center space-x-2 text-gold rounded-sm">
                            <Trophy size={24}/>
                            <span className="text-2xl font-bold text-center">{data.prizePool}</span>
                        </div>
                    </div>
                </div>

                <div className="p-8 space-y-6">
                    <div className="grid md:grid-cols-2 gap-6 items-center justify-items-center">
                        <div className="space-y-2">
                            <h3 className="text-lg font-heading font-bold text-primary text-center">Format</h3>
                            <p className="text-muted-foreground">{data.format}</p>
                        </div>
                        <div className="space-y-2 text-center">
                            <h3 className="text-lg font-heading font-bold text-primary text-center">Duration</h3>
                            <p className="text-muted-foreground">{data.duration}</p>
                        </div>

                    </div>

                    <div className="border-t border-primary/20 pt-6 hidden">
                        <h3 className="text-2xl font-heading font-bold text-gradient-accent mb-4 text-center">
                            Prize Distribution
                        </h3>
                        <div className="grid md:grid-cols-3 gap-4">
                            <Card className="p-6 bg-gold/10 border-gold/50 text-center">
                                <Trophy className="w-12 h-12 text-gold mx-auto mb-3"/>
                                <div className="text-sm text-muted-foreground mb-1">1st Place</div>
                                <div className="text-2xl font-heading font-black text-gold">
                                    {data.prizes.first}
                                </div>
                            </Card>
                            <Card className="p-6 bg-primary/10 border-primary/50 text-center">
                                <Trophy className="w-12 h-12 text-primary mx-auto mb-3"/>
                                <div className="text-sm text-muted-foreground mb-1">2nd Place</div>
                                <div className="text-2xl font-heading font-black text-primary">
                                    {data.prizes.second}
                                </div>
                            </Card>
                            <Card className="p-6 bg-accent/10 border-accent/50 text-center">
                                <Trophy className="w-12 h-12 text-accent mx-auto mb-3"/>
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
                <div className="absolute inset-0 bg-gradient-to-b from-background/90 via-background/70 to-background"/>
            </div>

            <div className="relative z-10 container mx-auto px-4 text-center space-y-8">
                <div className="space-y-4 animate-in fade-in slide-in-from-bottom duration-700">
                    <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-heading font-black leading-tight text-center">
                        <img src="/logo.svg" alt="logo image" className={'w-[300px] h-24 mx-auto mt-5'}/>
                    </h1>
                    <p className="text-base sm:text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto px-4">
                        The Ultimate Mobile Gaming Tournament
                    </p>
                    <p className="text-sm sm:text-base md:text-lg text-primary font-bold px-4">
                        Presented by Mora eSports Club & Rotaract Club of University of Moratuwa
                    </p>
                </div>

                <div className="space-y-6 animate-in fade-in slide-in-from-bottom duration-700 delay-200 px-4">
                    <div>
                        <h2 className="text-xl sm:text-2xl md:text-3xl font-heading font-bold text-primary mb-6">
                            Registration closes in
                        </h2>
                        <Countdown date={"31"}/>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <a href="#register-form">
                            <Button size="lg"
                                    className="text-base sm:text-lg px-6 sm:px-8 py-4 sm:py-6 glow-primary animate-glow w-full sm:w-auto">
                                Register Your Team
                            </Button>
                        </a>
                        <a href="#games">
                            <Button size="lg" variant="outline"
                                    className="text-base sm:text-lg px-6 sm:px-8 py-4 sm:py-6 border-primary/50 w-full sm:w-auto">
                                View Games
                            </Button>
                        </a>
                    </div>
                </div>

                {/* Quick Stats */}
                <div
                    className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto mt-12 animate-in fade-in slide-in-from-bottom duration-700 delay-300">
                    <div className="hidden bg-card/50 backdrop-blur-sm border border-primary/20 rounded-lg p-6">
                        <Trophy className="w-12 h-12 text-gold mx-auto mb-3"/>
                        <div className="text-3xl font-heading font-black text-gold">90,000 LKR</div>
                        <div className="text-muted-foreground">Total Prize Pool</div>
                    </div>
                    <div className="bg-card/50 backdrop-blur-sm border border-primary/20 rounded-lg p-6">
                        <Users className="w-12 h-12 text-primary mx-auto mb-3"/>
                        <div className="text-3xl font-heading font-black text-primary">3</div>
                        <div className="text-muted-foreground">Epic Games</div>
                    </div>
                    <div className="bg-card/50 backdrop-blur-sm border border-primary/20 rounded-lg p-6">
                        <Calendar className="w-12 h-12 text-accent mx-auto mb-3"/>
                        <div className="text-3xl font-heading font-black text-accent">Feb 7</div>
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
                            style={{animationDelay: `${index * 100}ms`}}
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
                    <Card
                        className="p-8 border-primary/20 hover:border-primary transition-all flex flex-col items-center justify-center text-center min-h-[280px] h-full">
                        <Target className="w-16 h-16 text-primary mb-4 mx-auto"/>
                        <h2 className="text-2xl font-heading font-bold text-primary mb-4 text-center">Our Mission</h2>
                        <p className="text-muted-foreground text-center">
                            To empower young gamers, sharpen their skills, and build a thriving esports community that
                            fosters competition, creativity, and innovation.
                        </p>
                    </Card>

                    <Card
                        className="p-8 border-accent/20 hover:border-accent transition-all flex flex-col items-center justify-center text-center min-h-[280px] h-full">
                        <Trophy className="w-16 h-16 text-accent mb-4 mx-auto"/>
                        <h2 className="text-2xl font-heading font-bold text-accent mb-4 text-center">Our Vision</h2>
                        <p className="text-muted-foreground text-center">
                            To expand Sri Lanka’s competitive esports scene by providing opportunities for gamers to
                            connect, compete, and grow while promoting teamwork, creativity, and digital innovation.
                        </p>
                    </Card>
                </div>

                <div className="mb-16">
                    <h2 className="text-4xl font-heading font-black text-center text-gradient-accent mb-12">
                        ORGANIZED BY
                    </h2>

                    <div className="grid md:grid-cols-2 gap-8">
                        <Card className="p-8 border-primary/20 pt-2">
                            {/*<Users className="w-16 h-16 text-primary mb-4 mx-auto" />*/}
                            <img src="/moraE.png" alt="Mora esports logo" className={'w-36 h-36 mx-auto'}/>
                            <h3 className="text-2xl font-heading font-bold text-primary mb-4 text-center">
                                Mora Esports Community
                            </h3>
                            <p className="text-muted-foreground">
                                Mora Esports is the official gaming community of the University of Moratuwa, bringing
                                together passionate gamers who represent the university in competitive events while
                                fostering skill development and a vibrant gaming community.
                            </p>
                        </Card>

                        <Card className="p-8 border-accent/20">
                            {/*<Heart className="w-16 h-16 text-accent mb-4 mx-auto" />*/}
                            <img src="/Rotaract%20Mora%20White.png" alt="Rotaract logo"
                                 className={'w-[380px] h-[110px] mx-auto border-0 border-neutral-500 rounded-lg'}/>
                            <h3 className="text-2xl font-heading font-bold text-accent mb-4 text-center">
                                Rotaract Mora
                            </h3>
                            <p className="text-muted-foreground">
                                Rotaract Club of the University of Moratuwa brings together motivated students to create
                                impact, lead initiatives, and engage with the community, while fostering collaboration,
                                creativity, and personal growth.
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
                            <div
                                className="flex-shrink-0 w-24 h-24 rounded-lg bg-primary/20 border-2 border-primary flex items-center justify-center">
                                <span className="text-2xl font-heading font-black text-primary">01</span>
                            </div>
                            <div className="flex-1">
                                <h3 className="text-xl font-heading font-bold text-primary mb-2">Registration Phase</h3>
                                <p className="text-muted-foreground mb-2">December 21 - January 31, 2026</p>
                                <p className="text-muted-foreground">Gear up. Sign up. Claim your spot in the
                                    showdown!</p>
                            </div>
                        </div>
                        {/* Phase 2: Tournament Day */}
                        <div className="flex gap-6 items-center">
                            <div
                                className="flex-shrink-0 w-24 h-24 rounded-lg bg-gold/20 border-2 border-gold flex items-center justify-center">
                                <span className="text-2xl font-heading font-black text-gold">02</span>
                            </div>
                            <div className="flex-1">
                                <h3 className="text-xl font-heading font-bold text-gold mb-2">Tournament Day</h3>
                                <p className="text-muted-foreground mb-2">February 7, 2026</p>
                                <p className="text-muted-foreground">One day of intense competition across all three
                                    games</p>
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
                            MLBB
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="pubg">
                        <GameTab game="pubg"/>
                    </TabsContent>

                    <TabsContent value="codm">
                        <GameTab game="codm"/>
                    </TabsContent>

                    <TabsContent value="mlbb">
                        <GameTab game="mlbb"/>
                    </TabsContent>
                </Tabs>
            </div>
        </section>

        {/* Teams Section */}
        <section id="teams" className="py-20 bg-background hidden">
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
                    {loadingTeams ?
                        <div className="text-muted-foreground">Loading teams...</div> : teams.length === 0 ? <>
                            <Trophy className="w-24 h-24 text-primary mx-auto mb-6 animate-float"/>
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
                                }].map(item => <div key={item.game}
                                                    className="bg-background/50 border border-primary/20 rounded-lg p-6">
                                    <Users className="w-12 h-12 text-primary mx-auto mb-3"/>

                                    <div className="text-sm text-muted-foreground">{item.game}</div>
                                </div>)}
                            </div>
                        </> : <>
                            <Trophy className="w-24 h-24 text-primary mx-auto mb-6 animate-float"/>
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
                                        <div
                                            className="sm:hidden flex items-center justify-center gap-2 mb-4 text-muted-foreground text-sm animate-pulse">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                                                 viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                                                 strokeLinecap="round" strokeLinejoin="round">
                                                <path d="M5 12h14"/>
                                                <path d="m12 5 7 7-7 7"/>
                                            </svg>
                                            <span>Swipe to view more teams</span>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                                                 viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                                                 strokeLinecap="round" strokeLinejoin="round">
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
                                                    <CarouselItem key={index}
                                                                  className="pl-2 md:pl-4 basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4">
                                                        <TeamCard
                                                            teamName={team.team_name}
                                                            game={game}
                                                            logoUrl={team.logo_url}
                                                        />
                                                    </CarouselItem>
                                                ))}
                                            </CarouselContent>
                                            <CarouselPrevious className="hidden sm:flex -left-4 md:-left-12"/>
                                            <CarouselNext className="hidden sm:flex -right-4 md:-right-12"/>
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
                        <Users className="w-8 h-8 text-primary"/>
                        <h2 className="text-2xl font-heading font-bold text-primary">Eligibility</h2>
                    </div>
                    <ul className="space-y-4">
                        <li className="flex items-start space-x-3">
                            <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-1"/>
                            <span className="text-muted-foreground">
                  Open to players of all skill levels and regions
                </span>
                        </li>
                        <li className="flex items-start space-x-3">
                            <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-1"/>
                            <span className="text-muted-foreground">
                  All participants must be undergraduate students from the same university
                </span>
                        </li>
                        <li className="flex items-start space-x-3">
                            <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-1"/>
                            <span className="text-muted-foreground">
                  Teams must register with valid in-game IDs and contact information
                </span>
                        </li>
                        <li className="flex items-start space-x-3">
                            <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-1"/>
                            <span className="text-muted-foreground">
                  Each player can only register with one team per game
                </span>
                        </li>
                    </ul>
                </Card>

                <Card className="p-8 border-accent/20 mb-8">
                    <div className="flex items-center space-x-3 mb-6">
                        <Shield className="w-8 h-8 text-accent"/>
                        <h2 className="text-2xl font-heading font-bold text-accent">Fair Play Policy</h2>
                    </div>
                    <div className="space-y-4 text-muted-foreground">
                        <p>We maintain a strict zero-tolerance policy for cheating and unfair practices:</p>
                        <ul className="space-y-3 ml-6">
                            <li className="flex items-start space-x-3">
                                <AlertCircle className="w-5 h-5 text-accent flex-shrink-0 mt-1"/>
                                <span>
                    <strong className="text-foreground">No Hacking or Modding:</strong> Use of any
                    third-party software, hacks, or game modifications will result in immediate
                    disqualification
                  </span>
                            </li>
                            <li className="flex items-start space-x-3">
                                <AlertCircle className="w-5 h-5 text-accent flex-shrink-0 mt-1"/>
                                <span>
                    <strong className="text-foreground">Account Integrity:</strong> Players must
                    use their registered accounts only. Account sharing is prohibited
                  </span>
                            </li>
                            <li className="flex items-start space-x-3">
                                <AlertCircle className="w-5 h-5 text-accent flex-shrink-0 mt-1"/>
                                <span>
                    <strong className="text-foreground">Fair Competition:</strong> Teaming with
                    opposing players, match-fixing, or intentional throwing is strictly forbidden
                  </span>
                            </li>
                        </ul>
                    </div>
                </Card>


                <div className="grid md:grid-cols-3 gap-6">
                    <Card
                        className="p-8 border-primary/20 text-center bg-gradient-primary/10 hover:border-primary transition-all pt-6">
                        {/*<Download className="w-12 h-12 text-primary mx-auto mb-4" />*/}
                        <img src="/pubg.jfif" alt="pubg image"
                             className={'w-20 h-20 mx-auto border-2 border-neutral-500 rounded-full'}/>
                        <h3 className="text-xl font-heading font-bold text-primary mb-3">
                            PUBG MOBILE
                        </h3>
                        <p className="text-sm text-muted-foreground mb-6">
                            PUBG Mobile Tournament Rules & Regulations
                        </p>
                        <a href="/PUBG%20%20Rulebook.pdf" download>
                            <Button variant="default" className="glow-primary w-full">
                                <Download className="mr-2 h-4 w-4"/>
                                Download Rule Book
                            </Button>
                        </a>
                    </Card>

                    <Card
                        className="p-8 border-accent/20 text-center bg-gradient-accent/10 hover:border-accent transition-all pt-6">
                        {/*<Download className="w-12 h-12 text-accent mx-auto mb-4" />*/}
                        <img src="/cod.jfif" alt="cod logo"
                             className={'w-20 h-20 mx-auto border-2 border-neutral-500 rounded-full'}/>
                        <h3 className="text-xl font-heading font-bold text-accent mb-3">
                            COD MOBILE
                        </h3>
                        <p className="text-sm text-muted-foreground mb-6">
                            COD Mobile Tournament Rules & Regulations
                        </p>
                        <a href="/Call%20of%20Duty%20Rule%20Book.pdf" download>
                            <Button variant="default" className="glow-accent w-full">
                                <Download className="mr-2 h-4 w-4"/>
                                Download Rule Book
                            </Button>
                        </a>
                    </Card>

                    <Card
                        className="p-8 border-gold/20 text-center bg-gradient-accent/10 hover:border-gold transition-all pt-6 ">
                        {/*<Download className="w-12 h-12 text-gold mx-auto mb-4" />*/}
                        <img src="/mlbb.jfif" alt="cod logo"
                             className={'w-20 h-20 mx-auto border-2 border-neutral-500 rounded-full'}/>
                        <h3 className="text-xl font-heading font-bold text-gold mb-3">
                            MOBILE LEGENDS
                        </h3>
                        <p className="text-sm text-muted-foreground mb-6">
                            MLBB Tournament Rules & Regulations
                        </p>
                        <a href="/Mobile%20Legends%20%20Rulebook.pdf" download>
                            <Button variant="default" className="glow-gold w-full">
                                <Download className="mr-2 h-4 w-4"/>
                                Download Rule Book
                            </Button>
                        </a>
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
                        Don’t miss out. Register now.
                    </p>
                    <Countdown date={"31"}/>
                </div>

                <div className="grid md:grid-cols-3 gap-6 mb-12">
                    <Card className="p-6 border-primary/20 text-center">
                        <Calendar className="w-12 h-12 text-primary mx-auto mb-4"/>
                        <h3 className="text-lg font-heading font-bold text-primary mb-2">Deadline</h3>
                        <p className="text-muted-foreground">January 31, 2025</p>
                    </Card>

                    <Card className="p-6 border-accent/20 text-center">
                        <Users className="w-12 h-12 text-accent mx-auto mb-4"/>
                        <h3 className="text-lg font-heading font-bold text-accent mb-2">Team Size</h3>
                        <p className="text-muted-foreground">4-5 Players + 1 Sub</p>
                    </Card>

                    <Card className="p-6 border-gold/20 text-center">
                        <DollarSign className="w-12 h-12 text-gold mx-auto mb-4"/>
                        <h3 className="text-lg font-heading font-bold text-gold mb-2">Entry Fee</h3>
                        <p className="text-muted-foreground">Per Team 1500LKR</p>
                    </Card>
                </div>


                <Card className="p-12 border-primary/20 text-center bg-gradient-primary/10" id="register-form">
                    <h2 className="text-3xl font-heading font-black text-gradient-accent mb-4">
                        Ready to Compete?
                    </h2>

                    <GoogleFormRedirect/>
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

                <div className="max-w-4xl mx-auto space-y-8">
                    <h2 className="text-xl sm:text-2xl font-heading font-bold text-primary mb-6 text-center">
                        Get In Touch
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Card className="p-6 sm:p-8 border-primary/20">
                            <div className="text-center mb-4">
                                <h3 className="text-lg font-heading font-bold text-primary">Nimith Induwara</h3>
                            </div>
                            <div className="space-y-4">
                                <div className="flex items-center space-x-3 justify-center">
                                    <Phone className="w-5 h-5 text-primary flex-shrink-0"/>
                                    <a href="tel:+94753884411"
                                       className="text-muted-foreground hover:text-primary transition-colors">
                                        0753884411
                                    </a>
                                </div>
                                <div className="flex items-center space-x-3 justify-center">
                                    <Mail className="w-5 h-5 text-primary flex-shrink-0"/>
                                    <a href="mailto:induwaranimith@gmail.com"
                                       className="text-muted-foreground hover:text-primary transition-colors">
                                        induwaranimith@gmail.com
                                    </a>
                                </div>
                            </div>
                        </Card>

                        <Card className="p-6 sm:p-8 border-accent/20">
                            <div className="text-center mb-4">
                                <h3 className="text-lg font-heading font-bold text-accent">Isiwara Mallawarachchi</h3>
                            </div>
                            <div className="space-y-4">
                                <div className="flex items-center space-x-3 justify-center">
                                    <Phone className="w-5 h-5 text-accent flex-shrink-0"/>
                                    <a href="tel:+94078 4626868"
                                       className="text-muted-foreground hover:text-accent transition-colors">
                                        078 4626868
                                    </a>
                                </div>
                                <div className="flex items-center space-x-3 justify-center">
                                    <Mail className="w-5 h-5 text-accent flex-shrink-0"/>
                                    <a href="mailto:isiwaramallawaarachchi@gmail.com"
                                       className="text-muted-foreground hover:text-accent transition-colors">
                                        isiwaramallawaarachchi@gmail.com
                                    </a>
                                </div>
                            </div>
                        </Card>
                    </div>

                    <Card className="p-6 sm:p-8 border-accent/20 w-full max-w-[680px] mx-auto lg:max-w-none">
                        <h3 className="text-lg sm:text-xl font-heading font-bold text-accent mb-4 text-center">
                            Tournament Organizers
                        </h3>
                        <div
                            className="flex flex-col space-y-8 md:flex-row md:space-x-12 justify-center items-center md:space-y-0">
                            <div>
                                <h4 className="font-bold text-foreground  text-center text-green-500">Mora E-Sports
                                    Community</h4>
                                <img src="/moraE.png" alt="Mora esports logo" className={'w-28 h-28 mx-auto'}/>
                            </div>
                            <div>
                                <h4 className="font-bold text-foreground mb-1 lg:mb-7 text-center text-green-500">Rotaract
                                    Mora</h4>
                                <img src="/Rotaract%20Mora%20White.png" alt="rotact logo"
                                     className={'w-72 h-20 mx-auto'}/>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </section>
    </div>;
};
export default Index;

