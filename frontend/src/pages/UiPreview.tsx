import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import Container from '../components/ui/Container';
import { H1, P } from '../components/ui/Typography';

export default function UiPreview() {
  return (
    <Container>
      <div className="space-y-6 py-10">
        <H1>UI System Preview</H1>
        <P>Our base design system components</P>
        <div className="flex gap-3">
          <Button>Primary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
        </div>
        <Card>
          <H1>Card Component</H1>
          <P>Elegant and reusable content container.</P>
        </Card>
      </div>
    </Container>
  );
}
