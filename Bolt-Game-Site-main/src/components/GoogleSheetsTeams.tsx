import { useEffect } from "react";
import { toast } from "sonner";

interface Team {
  team_name: string;
  game: string;
  logo_url?: string;
}

interface GoogleSheetsTeamsProps {
  onTeamsLoaded: (teams: Team[]) => void;
  onLoadingChange: (loading: boolean) => void;
}

const GoogleSheetsTeams = ({ onTeamsLoaded, onLoadingChange }: GoogleSheetsTeamsProps) => {
  const GOOGLE_SHEETS_URL = "https://docs.google.com/spreadsheets/d/1-B-aAjXju41h_iWpX314DVrcLostS0WhwawD5J25uus/gviz/tq?tqx=out:json";

  const toDisplayableLogo = (raw?: string): string | undefined => {
    if (!raw) return undefined;
    try {
      const url = new URL(raw);
      const host = url.hostname;
      if (host.includes("drive.google.com")) {
        let id = "";
        const pathParts = url.pathname.split("/").filter(Boolean);
        const idIndex = pathParts.indexOf("d");
        if (idIndex >= 0 && pathParts[idIndex + 1]) {
          id = pathParts[idIndex + 1];
        } else if (url.searchParams.get("id")) {
          id = url.searchParams.get("id") as string;
        }
        if (id) {
          return `https://drive.google.com/uc?export=view&id=${id}`;
        }
      }
      return raw;
    } catch {
      return raw;
    }
  };

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        onLoadingChange(true);
        const response = await fetch(GOOGLE_SHEETS_URL);
        if (!response.ok) throw new Error("Failed to fetch data from Google Sheets");

        const data = await response.text();
        const json = JSON.parse(data.substring(47).slice(0, -2));

        const teams: Team[] = [];
        if (json.table && json.table.rows) {
          json.table.rows.forEach((row: any) => {
            const nameCell = row.c?.[0];
            const gameCell = row.c?.[1];
            const logoCell = row.c?.[2];
            if (nameCell && gameCell) {
              teams.push({
                team_name: nameCell.v || "",
                game: gameCell.v || "",
                logo_url: toDisplayableLogo(logoCell?.v)
              });
            }
          });
        }

        onTeamsLoaded(teams);
      } catch (error) {
        console.error("Error fetching teams:", error);
        toast.error("Failed to load team data. Please try again later.");
        onTeamsLoaded([]);
      } finally {
        onLoadingChange(false);
      }
    };

    fetchTeams();

    const interval = setInterval(fetchTeams, 30000);
    return () => clearInterval(interval);
  }, [onTeamsLoaded, onLoadingChange, GOOGLE_SHEETS_URL]);

  return null;
};

export default GoogleSheetsTeams;
