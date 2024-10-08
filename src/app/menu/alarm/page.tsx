import { Suspense } from "react";

import Loading from "@/app/loading";

import { AlarmPageScreen } from "./_component/AlarmPageScreen";

import { AppBar } from "@/components/AppBar";
import { AppContainer } from "@/components/Container";

export default function AlarmPage() {
  return (
    <AppContainer>
      <AppBar useLeftBack title="알림" />
      <Suspense fallback={<Loading />}>
        <AlarmPageScreen />
      </Suspense>
    </AppContainer>
  );
}
