import Zombie from "./zombie";
import Bullet from "./bullet";

export function bulletHitTest(bullets: Array<Bullet>, zombies: Array<Zombie>, bulletRadius: number, zombieRadius: number) {
    bullets.forEach((bullet) => {
        zombies.forEach((zombie, index) => {
            const dx = zombie.position.x - bullet.position.x;
            const dy = zombie.position.y - bullet.position.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < bulletRadius + zombieRadius) {
                zombies.splice(index, 1);

                zombie.kill();
            }
        });
    });
}