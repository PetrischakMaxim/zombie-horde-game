import Zombie from "../components/zombie";
import Bullet from "../components/bullet";

export function bulletHitTest(bullets: Array<Bullet>, zombies: Array<Zombie>, bulletRadius: number, zombieRadius: number) {
    bullets.forEach((bullet) => {
        zombies.forEach((zombie, index) => {
            const dx = zombie.position.x - bullet.position.x;
            const dy = zombie.position.y - bullet.position.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < bulletRadius + zombieRadius) {
                bullets.splice(index, 1);
                bullet.alpha = 0;
                zombies.splice(index, 1);
                zombie.kill();
            }
        });
    });
}