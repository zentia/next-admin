import Layout from '@/components/Layout';

import styles from './index.module.less';

export default function Dashboard(){
    return (
        <Layout curActive='/dashboard/monoMemoryProfiler'>
            <main className={styles.monotorWrap}>
                
            </main>
        </Layout>
    );
}