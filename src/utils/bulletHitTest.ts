import Zombie from "../components/zombie";
import Bullet from "../components/bullet";
import Counter from "../components/counter";

export function bulletHitTest(bullets: Array<Bullet>, zombies: Array<Zombie>, bulletRadius: number, zombieRadius: number, counter: Counter) {
    bullets.forEach((bullet) => {
        zombies.forEach((zombie, index) => {
            const dx = zombie.position.x - bullet.position.x;
            const dy = zombie.position.y - bullet.position.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < bulletRadius + zombieRadius) {
                bullet.alpha = 0;
                bullets.splice(index, 1);
                zombies.splice(index, 1);
                zombie.kill();
                counter.update();
            }
        });
    });
}