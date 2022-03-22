export class Languages {
  public ptbr: string | null = null;
  public es: string | null = null;
  public en: string | null = null;

  constructor(languages: Partial<Languages>) {
    Object.assign(this, languages);
  }
}
