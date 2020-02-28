export function parseCSC(value:any) {
    const flags = value.getUint8(0, true)
    const hasWheel = !!(flags & 0x01)
    const hasCrank = !!(flags & 0x02)
    let index = 1
    const res = {wheelRevs: null, wheelTime: null, crankRevs: null, crankTime: null}
    if (hasWheel) {
      res.wheelRevs = value.getUint32(index, true)
      index += 4
      res.wheelTime = value.getUint16(index, true)
      index += 2
    }
    if (hasCrank) {
      res.crankRevs = value.getUint16(index, true)
      index += 2
      res.crankTime = value.getUint16(index, true)
      index += 2
    }
    return res
  }

export function revsToRPM(t1:any, t2:any) {
    const deltaRevs = t2.revs - t1.revs
    if (deltaRevs === 0) {
      // no rotation
      return 0
    }
  
    let deltaTime = (t2.time - t1.time) / 1024
    if (deltaTime < 0) {
      // time counter wraparound
      deltaTime += Math.pow(2, 16) / 1024
    }
    deltaTime /= 60  // seconds to minutes
  
    const rpm = deltaRevs / deltaTime
    return rpm
  }

  const wheelSize = 622  // mm; 700C
  const wheelCircumference = Math.PI * 622
export function revsToKM(revs:any) {
    const mm = revs * wheelCircumference
    const km = mm / 1e6
    return km
  }

export function rpmToKPH(rpm:any) {
    const rph = rpm * 60
    const mmph = rph * wheelCircumference
    const kph = mmph / 1e6
    return kph
  }
