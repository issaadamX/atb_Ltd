import React, { useState } from "react";
import { Button } from "./ui";
import { Input } from "./ui/Input";
import { Textarea } from "./ui/Textarea";
import { useToast } from "../hooks/use-toast";
import { Send, CheckCircle } from "lucide-react";

interface BookingFormProps {
  variant?: "default" | "compact";
}

export const BookingForm = ({ variant = "default" }: BookingFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('http://localhost:5000/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast({
          title: "Demande de Consultation Envoyée !",
          description: "Nous vous répondrons dans les 24 heures.",
        });
        setFormData({ name: "", email: "", phone: "", service: "", message: "" });
      } else {
        toast({
          title: "Erreur",
          description: "Une erreur s'est produite. Veuillez réessayer.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de se connecter au serveur.",
        variant: "destructive",
      });
    }

    setIsSubmitting(false);
  };

  const services = [
    "Construction Résidentielle",
    "Bâtiments Commerciaux",
    "Conception Structurelle",
    "Supervision de Chantier",
    "Estimation des Coûts",
    "Rénovation",
  ];

  const isCompact = variant === "compact";

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className={isCompact ? "space-y-4" : "grid sm:grid-cols-2 gap-5"}>
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Nom Complet *</label>
          <Input
            required
            placeholder="Jean Dupont"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="h-12"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Email *</label>
          <Input
            required
            type="email"
            placeholder="jean@exemple.com"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="h-12"
          />
        </div>
      </div>

      <div className={isCompact ? "space-y-4" : "grid sm:grid-cols-2 gap-5"}>
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Numéro de Téléphone</label>
          <Input
            type="tel"
            placeholder="+235 XX XX XX XX"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className="h-12"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Service Requis *</label>
          <select
            required
            value={formData.service}
            onChange={(e) => setFormData({ ...formData, service: e.target.value })}
            className="w-full h-12 px-4 rounded-md border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          >
            <option value="">Sélectionner un service</option>
            {services.map((service) => (
              <option key={service} value={service}>
                {service}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-foreground">Votre Message</label>
        <Textarea
          placeholder="Décrivez votre projet..."
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          rows={4}
          className="resize-none"
        />
      </div>

      <Button
        type="submit"
        variant="accent"
        size="lg"
        className="w-full"
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <>
            <div className="w-5 h-5 border-2 border-accent-foreground/30 border-t-accent-foreground rounded-full animate-spin" />
            Envoi en cours...
          </>
        ) : (
          <>
            <Send className="w-5 h-5" />
            Demander une Consultation
          </>
        )}
      </Button>

      <p className="text-center text-sm text-muted-foreground">
        <CheckCircle className="w-4 h-4 inline mr-1" />
        Nous répondons sous 24 heures
      </p>
    </form>
  );
};
