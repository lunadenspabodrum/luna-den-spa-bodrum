import { BranchGallery } from "@/features/hakkımızda/components/BranchGallery";
import { KnownUs } from "@/features/hakkımızda/components/KnownUs";
import { WhyUs } from "@/features/hakkımızda/components/WhyUs";

export default function AboutPageWrapper() {
  return (
    <>
      <KnownUs />
      <BranchGallery />
      <WhyUs />
    </>
  );
}
