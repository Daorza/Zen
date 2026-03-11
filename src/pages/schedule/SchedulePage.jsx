import { GlassCard } from "../../components/ui/GlassCard"
import { CalendarWidget } from "../../components/schedule/CalendarWidget"
import { DayProgressWidget } from "../../components/schedule/DayProgressWidget"
import { ActivitiesWidget } from "../../components/schedule/ActivitiesWidget"
import { Timeline } from "../../components/schedule/Timeline"
import { TimelineEvent } from "../../components/schedule/TimelineEvent"

export default function SchedulePage() {

  return (
    <>
      <GlassCard>
        <CalendarWidget />
      </GlassCard>

      <GlassCard>
        <DayProgressWidget />
      </GlassCard>

      <GlassCard>
        <ActivitiesWidget pending={1}/>
      </GlassCard>

      <GlassCard>
        <Timeline>

          <TimelineEvent
            time="10:00"
            title="Pergi ke Taman Mini Indonesia Indah"
            duration="1h"
            status="Pending"
          />

        </Timeline>

      </GlassCard>
    </>
  );
}