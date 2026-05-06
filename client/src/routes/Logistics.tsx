import { motion } from 'framer-motion';
import { LogisticsHero } from '../components/logistics/LogisticsHero';
import { LogisticsProcess } from '../components/logistics/LogisticsProcess';



import { LogisticsCompliance } from '../components/logistics/LogisticsCompliance';

import { LogisticsCTA } from '../components/logistics/LogisticsCTA';
import { IndiaNetworkMap } from '../components/IndiaNetworkMap';

export function Logistics() {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-full min-h-screen bg-background"
        >
            <LogisticsHero />
            <LogisticsProcess />
            <IndiaNetworkMap />
            <LogisticsCompliance />
            <LogisticsCTA />
        </motion.div>
    );
}
