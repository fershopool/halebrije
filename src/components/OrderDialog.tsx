import { sitePath } from '../utilities/paths';
import { useRef } from 'react';
import { brand } from '../config/brand';
import { Icon } from './Icon';
export function OrderDialog({
  dialogRef,
}: {
  dialogRef: React.RefObject<HTMLDialogElement | null>;
}) {
  const content = useRef<HTMLDivElement>(null);
  return (
    <dialog
      className="order-dialog"
      ref={dialogRef}
      aria-labelledby="order-title"
      onClick={(event) => {
        if (event.target === event.currentTarget && content.current) {
          const rect = content.current.getBoundingClientRect();
          if (
            event.clientX < rect.left ||
            event.clientX > rect.right ||
            event.clientY < rect.top ||
            event.clientY > rect.bottom
          )
            dialogRef.current?.close();
        }
      }}
    >
      <div className="order-dialog-inner" ref={content}>
        <button
          className="dialog-close"
          aria-label="Cerrar opciones de pedido"
          onClick={() => dialogRef.current?.close()}
        >
          <Icon name="close" />
        </button>
        <span className="small-label">Tu próximo antojo</span>
        <h2 id="order-title">
          Nos vemos
          <br />
          en Halebrije.
        </h2>
        <p>
          Consulta productos, sabores disponibles y opciones de pedido directamente con la marca.
        </p>
        <a className="button button-dark" href={brand.instagram} target="_blank" rel="noreferrer">
          <Icon name="instagram" />
          Consultar en Instagram
          <Icon name="diagonal" />
        </a>
        <a
          className="text-link"
          href={sitePath('/visitanos/')}
          onClick={() => dialogRef.current?.close()}
        >
          Visitar el punto de venta
          <Icon />
        </a>
        <p className="fine-print">
          El canal de WhatsApp estará disponible cuando Halebrije confirme su número.
        </p>
      </div>
    </dialog>
  );
}
