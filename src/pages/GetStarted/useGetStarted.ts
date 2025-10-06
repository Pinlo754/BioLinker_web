import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
const useGetStarted = () => {
    const navigate = useNavigate(); 
    const { username } = useLocation().state || {};
    const options = [
        {
          title: "Artist",
          description:
            "Showcase my work, grow my audience, and connect with fans or clients.",
        },
        {
          title: "Producer",
          description:
            "Showcase my projects, manage content distribution, and find new ways to connect with audiences and collaborators.",
        },
        {
          title: "Producer",
          description:
            "Showcase my services, attract new clients, and manage my online presence in one easy-to-share link.",
        },
        {
          title: "Creator",
          description:
            "Build and engage my audience while exploring tools to share content, grow my brand, and generate income from my creative work.",
        },
        {
          title: "Owner",
          description:
            "Promote my business, drive traffic to key platforms, and manage my brand presence in one central place.",
        },
        {
          title: "Personal",
          description:
            "Share everything that matters to me — from social profiles to passions — all in one simple, personalized link.",
        },
      ];

    const handleBack = () => {
      navigate('/signup')
    }

    const handleContinue = (job: string) => {
      navigate('/signup/add-domain', { 
        state: { 
            username: username,
            job: job,
          } 
      });
    }

    const handleSkip = () => {
      navigate('/signup/add-domain', { 
        state: { 
          username: username,
          job: "",
        } 
      });
    }
  
    return {
        options,
        handleBack,
        handleContinue,
        handleSkip,
    }
}
export default useGetStarted;