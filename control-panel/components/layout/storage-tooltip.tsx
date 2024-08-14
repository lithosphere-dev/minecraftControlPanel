import { useTheme } from 'next-themes';
import { Tooltip, TooltipProps } from 'recharts';

export const StorageTooltip: React.FC<TooltipProps<number, string>> = ({ active, payload, label }) => {
    const theme = useTheme();
    if (active && payload && payload.length) {
        return (
            <div className={`rounded bg-zinc-100 dark:bg-zinc-800 px-2 py-1 border border-black/15 dark:border-white/15`} >
                <p>{`${payload[0].name}: ${payload[0].value}`} %</p>
            </div>
        );
    }

    return null;
};

