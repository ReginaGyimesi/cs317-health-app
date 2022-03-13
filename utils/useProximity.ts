import { useEffect, useState } from "react";
import { Proximity } from "react-native-proximity";

type Props = {
  proximity: any;
};

export default function useProximity() {
  const [hasProximity, setHasProximity] = useState(false);

  useEffect(() => {
    const callback = ({ proximity }: Props) => setHasProximity(!!proximity);
    Proximity?.addListener(callback);

    return () => Proximity?.removeListener(callback);
  }, []);

  return { hasProximity };
}
