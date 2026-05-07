import type { SiteSetting } from '@trio/shared/settings';
import type { Station } from '@trio/shared/station';
import { api } from './axios';

type PublicSettings = Omit<SiteSetting, 'id'>;

export async function getPublicSettings(): Promise<PublicSettings> {
    const { data } = await api.get('/api/settings');
    return data;
}

export async function getPublicStations(): Promise<Station[]> {
    const { data } = await api.get('/api/stations');
    return data;
}
