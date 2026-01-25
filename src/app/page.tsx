import Container from "@/app/_components/container";
import { Profile } from "@/app/_components/profile";
import { SocialLinks } from "@/app/_components/social-links";

export default function Index() {
  return (
    <main>
      <Container>
        <Profile />
        <SocialLinks />
      </Container>
    </main>
  );
}
