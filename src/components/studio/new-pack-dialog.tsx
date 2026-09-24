import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { isValidNamespace, slugifyNamespace } from "@/lib/bedrock/pack";
import { useStudio } from "@/lib/studio-store";

export function NewPackDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const createPack = useStudio((s) => s.createPack);
  const [name, setName] = useState("Ruby Pack");
  const [namespace, setNamespace] = useState("ruby_pack");
  const [nsTouched, setNsTouched] = useState(false);
  const [description, setDescription] = useState(
    "Custom Bedrock items, blocks, and mobs.",
  );

  useEffect(() => {
    if (!open) return;
    setName("Ruby Pack");
    setNamespace("ruby_pack");
    setNsTouched(false);
    setDescription("Custom Bedrock items, blocks, and mobs.");
  }, [open]);

  function onName(value: string) {
    setName(value);
    if (!nsTouched) setNamespace(slugifyNamespace(value));
  }

  const valid = name.trim().length > 0 && isValidNamespace(namespace);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>New addon</DialogTitle>
          <DialogDescription>
            Creates a linked behavior pack and resource pack with unique UUIDs,
            empty texture atlases, and lang files. Targets Bedrock 1.21.
          </DialogDescription>
        </DialogHeader>
        <form
          className="space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            if (!valid) return;
            createPack({ name, namespace, description });
            onOpenChange(false);
          }}
        >
          <label className="block space-y-1.5">
            <span className="text-xs font-medium text-muted">Pack name</span>
            <Input
              value={name}
              onChange={(e) => onName(e.target.value)}
              autoComplete="off"
              required
            />
          </label>
          <label className="block space-y-1.5">
            <span className="text-xs font-medium text-muted">Namespace</span>
            <Input
              value={namespace}
              onChange={(e) => {
                setNsTouched(true);
                setNamespace(e.target.value.toLowerCase());
              }}
              autoComplete="off"
              spellCheck={false}
              required
            />
            {!isValidNamespace(namespace) && (
              <span className="text-xs text-danger">
                Lowercase, starts with a letter, only a-z, 0-9, underscore.
              </span>
            )}
          </label>
          <label className="block space-y-1.5">
            <span className="text-xs font-medium text-muted">Description</span>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
            />
          </label>
          <div className="flex justify-end gap-2 pt-2">
            <Button type="button" variant="ghost" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={!valid}>
              Forge pack
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
