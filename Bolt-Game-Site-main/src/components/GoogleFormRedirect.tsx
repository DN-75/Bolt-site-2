import { Button } from "@/components/ui/button";

const GoogleFormRedirect = () => {
  const GOOGLE_FORM_URL = "https://docs.google.com/forms/d/e/1FAIpQLSfZkOrc06SwsPPizL2K8IxjpZwi5Ei2Mi2r5N5KLIQo3URhmA/viewform";

  const handleOpenForm = () => {
    window.open(GOOGLE_FORM_URL, "_blank");
  };

  return (
    <Button
      size="lg"
      className="cursor-not-allowed glow-primary animate-glow px-[10px] py-[20px] my-0 mx-auto text-base font-bold text-center hover:scale-105"
      onClick={handleOpenForm}
      disabled={true}
    >
      Open Registration Form
    </Button>
  );
};

export default GoogleFormRedirect;
