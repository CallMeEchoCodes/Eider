export type Event = {
  trigger: string
  type: 'on' | 'once'
  run: Function
}
