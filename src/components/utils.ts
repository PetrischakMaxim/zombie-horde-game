import Zombie from "./zombie";
import Bullet from "./bullet";

export function bulletHitTest(bullets: [Bullet], zombies: [Zombie], bulletRadius: number, zombieRadius: number) {
    for (let i = 0; i < bullets.length; i++) {
        const bullet = bullets[i];
        zombies.forEach((zombie: Zombie, index: number) => {
            const dx = zombie.position.x - bullet.position.x;
            const dy = zombie.position.y - bullet.position.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < bulletRadius + zombieRadius) {
                zombies.splice(index, 1);
                zombie.kill();
            }
        });
    }
}