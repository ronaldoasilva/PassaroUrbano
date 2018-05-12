import { ItemCarrinho } from './shared/item-carrinho.model';
import { Oferta } from './shared/oferta.model';

class CarrinhoService {
    public itens: ItemCarrinho[] = [];

    public exibirItens(): ItemCarrinho[] {
        return this.itens;
    }

    public incluirItem(oferta: Oferta): void {
        const itemCarrinho: ItemCarrinho = new ItemCarrinho(
            oferta.id,
            oferta.imagens[0],
            oferta.titulo,
            oferta.descricao_oferta,
            oferta.valor,
            1
        );
        // verificar se o item em questão já não existe dentro de this.itens
        const itemCarrinhoEncontrato = this.itens.find((item: ItemCarrinho) => item.id === itemCarrinho.id);

        if (itemCarrinhoEncontrato) {
            itemCarrinhoEncontrato.quantidade += 1;
        } else {
            this.itens.push(itemCarrinho);
        }
    }

    public totalCarrinhoCompras(): number {

        let total = 0;

        this.itens.map((item: ItemCarrinho) => {
            total = total + (item.valor * item.quantidade);
        });

        return total;
    }

    public adicionarQuantidade(itemCarrinho: ItemCarrinho): void {
        const itemCarrinhoEncontrato = this.itens.find((item: ItemCarrinho) => item.id === itemCarrinho.id);

        if (itemCarrinhoEncontrato) {
            itemCarrinhoEncontrato.quantidade += 1;
        }
    }

    public diminuirQuantidade(itemCarrinho: ItemCarrinho): void {
        const itemCarrinhoEncontrato = this.itens.find((item: ItemCarrinho) => item.id === itemCarrinho.id);

        if (itemCarrinhoEncontrato) {
            itemCarrinhoEncontrato.quantidade -= 1;

            if (itemCarrinhoEncontrato.quantidade === 0) {
                this.itens.slice(this.itens.indexOf(itemCarrinhoEncontrato), 1);
            }
        }
    }

    public limparCarrinho(): void {
        this.itens = [];
    }
}

export { CarrinhoService };
