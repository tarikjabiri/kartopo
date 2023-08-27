import useLayerContext from "@hooks/useLayerContext";
import { Radio, ColorSwatch, Grid, Paper } from "@mantine/core";
import KCLayerShowActions from "./KCLayerShowActions";

export default function KCLayerShow() {
  const layer = useLayerContext();
  return (
    <Paper withBorder p={3} mb={4}>
      <Grid mx={0} align="center">
        <Grid.Col span={6}>
          <Radio value={layer.name} size="sm" label={layer.name} />
        </Grid.Col>
        <Grid.Col span={2}>
          <ColorSwatch size={20} color={layer.color} />
        </Grid.Col>
        <Grid.Col span={4}>
          <KCLayerShowActions />
        </Grid.Col>
      </Grid>
    </Paper>
  );
}
