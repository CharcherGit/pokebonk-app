/**
 * The few texts the desktop shell shows by itself (native dialogs and the offline page), in the game's ten languages.
 * The game's own texts live in src/i18n; these are here because the shell runs before (and without) the game.
 */
export type Lang = 'es' | 'en' | 'pt' | 'fr' | 'ja' | 'zh' | 'zht' | 'ko' | 'ru' | 'de';
const LANGS: Lang[] = ['es', 'en', 'pt', 'fr', 'ja', 'zh', 'zht', 'ko', 'ru', 'de'];

/** Same rule as the game's detectLang (src/core/i18n.ts): Taiwan, Hong Kong, Macao and Hant read Traditional Chinese. */
export function langOf(tag: string): Lang {
  const l = (tag || '').toLowerCase(), base = l.split('-')[0];
  if (base === 'zh') return /-(tw|hk|mo|hant)\b/.test(l) ? 'zht' : 'zh';
  return (LANGS as string[]).includes(base) ? (base as Lang) : 'en';
}

const T = {
  quitTitle: {
    es: '¿Salir de PokéBonk?', en: 'Quit PokéBonk?', pt: 'Sair do PokéBonk?', fr: 'Quitter PokéBonk ?', ja: 'PokéBonkを終了しますか？',
    zh: '退出 PokéBonk？', zht: '退出 PokéBonk？', ko: 'PokéBonk를 종료할까요?', ru: 'Выйти из PokéBonk?',
    de: 'PokéBonk beenden?',
  },
  quitRun: {
    es: 'Tienes una partida en curso. Si sales ahora, se guarda lo conseguido hasta este momento, pero la partida termina. Para seguirla otro día, usa «Guardar y salir» en la pausa.',
    en: 'You have a run in progress. If you quit now, what you earned so far is kept, but the run ends. To continue it another day, use «Save and quit» in the pause menu.',
    pt: 'Você tem uma partida em andamento. Se sair agora, o que conseguiu até aqui é guardado, mas a partida termina. Para continuá-la outro dia, use «Salvar e sair» na pausa.',
    fr: 'Une partie est en cours. Si vous quittez maintenant, ce que vous avez obtenu est conservé, mais la partie se termine. Pour la reprendre un autre jour, utilisez « Sauvegarder et quitter » dans la pause.',
    ja: 'プレイ中のランがあります。今終了すると、ここまでの成果は保存されますが、ランは終わります。後日続けるには、ポーズメニューの「セーブして終わる」を使ってください。',
    zh: '你有一局正在进行。现在退出会保留目前的收获，但这局会结束。想改天继续，请在暂停菜单中使用「保存并退出」。',
    zht: '你有一局正在進行。現在退出會保留目前的收穫，但這局會結束。想改天繼續，請在暫停選單中使用「儲存並退出」。',
    ko: '진행 중인 판이 있습니다. 지금 나가면 지금까지 얻은 것은 저장되지만 판은 끝납니다. 다른 날 이어 하려면 일시정지 메뉴의 「저장하고 나가기」를 사용하세요.',
    ru: 'У вас идёт забег. Если выйти сейчас, всё полученное сохранится, но забег закончится. Чтобы продолжить его в другой день, используйте «Сохранить и выйти» в меню паузы.',
    de: 'Du hast eine laufende Runde. Wenn du jetzt beendest, bleibt alles Erreichte erhalten, aber die Runde endet. Um sie an einem anderen Tag fortzusetzen, nutze „Speichern und beenden“ im Pausenmenü.',
  },
  quit: { es: 'Salir', en: 'Quit', pt: 'Sair', fr: 'Quitter', ja: '終了', zh: '退出', zht: '退出', ko: '나가기', ru: 'Выйти', de: 'Beenden' },
  keep: {
    es: 'Seguir jugando', en: 'Keep playing', pt: 'Continuar jogando', fr: 'Continuer à jouer', ja: 'プレイを続ける',
    zh: '继续游戏', zht: '繼續遊戲', ko: '계속 플레이', ru: 'Продолжить игру',
    de: 'Weiterspielen',
  },
  updateTitle: {
    es: 'Nueva versión del cliente', en: 'New client version', pt: 'Nova versão do cliente', fr: 'Nouvelle version du client', ja: 'クライアントの新しいバージョン',
    zh: '客户端有新版本', zht: '用戶端有新版本', ko: '새 클라이언트 버전', ru: 'Новая версия клиента',
    de: 'Neue Client-Version',
  },
  updateBody: {
    es: 'Hay una versión nueva del cliente de escritorio ({v}). El juego ya está al día; esta actualización mejora la ventana y el rendimiento.',
    en: 'A new version of the desktop client is out ({v}). The game itself is already up to date; this update improves the window and performance.',
    pt: 'Há uma nova versão do cliente para computador ({v}). O jogo já está atualizado; esta atualização melhora a janela e o desempenho.',
    fr: 'Une nouvelle version du client de bureau est disponible ({v}). Le jeu est déjà à jour ; cette mise à jour améliore la fenêtre et les performances.',
    ja: 'デスクトップクライアントの新しいバージョン（{v}）があります。ゲーム自体は最新です。この更新はウィンドウと動作を改善します。',
    zh: '桌面客户端有新版本（{v}）。游戏本身已是最新；此更新改进窗口和性能。',
    zht: '桌面用戶端有新版本（{v}）。遊戲本身已是最新；此更新改善視窗與效能。',
    ko: '데스크톱 클라이언트의 새 버전({v})이 나왔습니다. 게임은 이미 최신입니다. 이 업데이트는 창과 성능을 개선합니다.',
    ru: 'Вышла новая версия клиента ({v}). Сама игра уже обновлена; это обновление улучшает окно и производительность.',
    de: 'Eine neue Version des Desktop-Clients ist da ({v}). Das Spiel selbst ist schon aktuell; dieses Update verbessert das Fenster und die Leistung.',
  },
  download: { es: 'Descargar', en: 'Download', pt: 'Baixar', fr: 'Télécharger', ja: 'ダウンロード', zh: '下载', zht: '下載', ko: '다운로드', ru: 'Скачать', de: 'Herunterladen' },
  // Discord Rich Presence button that friends see on the player's profile (32 characters at most).
  rpcPlay: { es: 'Jugar gratis', en: 'Play for free', pt: 'Jogar grátis', fr: 'Jouer gratuitement', ja: '無料でプレイ', zh: '免费游玩', zht: '免費遊玩', ko: '무료로 플레이', ru: 'Играть бесплатно', de: 'Kostenlos spielen' },
  later: { es: 'Más tarde', en: 'Later', pt: 'Mais tarde', fr: 'Plus tard', ja: 'あとで', zh: '稍后', zht: '稍後', ko: '나중에', ru: 'Позже', de: 'Später' },
  offTitle: {
    es: 'No podemos conectar con PokéBonk', en: "We can't reach PokéBonk", pt: 'Não conseguimos conectar ao PokéBonk', fr: 'Impossible de joindre PokéBonk',
    ja: 'PokéBonkに接続できません', zh: '无法连接到 PokéBonk', zht: '無法連線到 PokéBonk', ko: 'PokéBonk에 연결할 수 없습니다', ru: 'Не удаётся подключиться к PokéBonk',
    de: 'PokéBonk ist nicht erreichbar',
  },
  offBody: {
    es: 'Tu progreso se guarda en el servidor, así que el juego necesita conexión. Comprueba tu internet; si estás conectado, puede que estemos actualizando: vuelve a intentarlo en un momento.',
    en: 'Your progress is saved on the server, so the game needs a connection. Check your internet; if you are online, we may be updating: try again in a moment.',
    pt: 'Seu progresso é salvo no servidor, então o jogo precisa de conexão. Verifique sua internet; se estiver conectado, talvez estejamos atualizando: tente de novo em instantes.',
    fr: 'Votre progression est enregistrée sur le serveur, le jeu a donc besoin d’une connexion. Vérifiez votre internet ; si vous êtes connecté, nous sommes peut-être en train de mettre à jour : réessayez dans un instant.',
    ja: '進行状況はサーバーに保存されるため、ゲームには接続が必要です。インターネットを確認してください。接続している場合は更新中かもしれません。少し待ってからもう一度お試しください。',
    zh: '你的进度保存在服务器上，所以游戏需要联网。请检查网络；如果已联网，可能是我们正在更新：请稍后再试。',
    zht: '你的進度儲存在伺服器上，所以遊戲需要連線。請檢查網路；如果已連線，可能是我們正在更新：請稍後再試。',
    ko: '진행 상황은 서버에 저장되므로 게임에는 연결이 필요합니다. 인터넷을 확인하세요. 연결되어 있다면 업데이트 중일 수 있으니 잠시 후 다시 시도하세요.',
    ru: 'Прогресс хранится на сервере, поэтому игре нужно подключение. Проверьте интернет; если вы в сети, возможно, идёт обновление: попробуйте ещё раз чуть позже.',
    de: 'Dein Fortschritt wird auf dem Server gespeichert, daher braucht das Spiel eine Verbindung. Prüfe dein Internet; wenn du online bist, aktualisieren wir vielleicht gerade: Versuche es gleich noch einmal.',
  },
  retry: { es: 'Reintentar', en: 'Try again', pt: 'Tentar de novo', fr: 'Réessayer', ja: '再試行', zh: '重试', zht: '重試', ko: '다시 시도', ru: 'Повторить', de: 'Erneut versuchen' },
  crashed: {
    es: 'El juego se ha cerrado de forma inesperada. Lo conseguido en la partida se recupera al volver a entrar.',
    en: 'The game closed unexpectedly. What you earned in the run is recovered when you come back in.',
    pt: 'O jogo fechou inesperadamente. O que você conseguiu na partida é recuperado ao entrar de novo.',
    fr: 'Le jeu s’est fermé de façon inattendue. Ce que vous avez obtenu pendant la partie est récupéré en revenant.',
    ja: 'ゲームが予期せず終了しました。ランで得たものは再び入ると復元されます。',
    zh: '游戏意外关闭。重新进入后会找回这局的收获。',
    zht: '遊戲意外關閉。重新進入後會找回這局的收穫。',
    ko: '게임이 예기치 않게 종료되었습니다. 판에서 얻은 것은 다시 들어오면 복구됩니다.',
    ru: 'Игра неожиданно закрылась. Полученное в забеге восстановится, когда вы вернётесь.',
    de: 'Das Spiel wurde unerwartet geschlossen. Was du in der Runde erreicht hast, bekommst du beim nächsten Start zurück.',
  },
  // Loading screen (static/splash.html): what it says before the game can say it itself.
  connecting: {
    es: 'Conectando con PokéBonk…', en: 'Connecting to PokéBonk…', pt: 'Conectando ao PokéBonk…', fr: 'Connexion à PokéBonk…', ja: 'PokéBonkに接続中…',
    zh: '正在连接 PokéBonk…', zht: '正在連線到 PokéBonk…', ko: 'PokéBonk에 연결 중…', ru: 'Подключение к PokéBonk…',
    de: 'Verbinde mit PokéBonk…',
  },
  loadingGame: {
    es: 'Cargando el juego…', en: 'Loading the game…', pt: 'Carregando o jogo…', fr: 'Chargement du jeu…', ja: 'ゲームを読み込み中…',
    zh: '正在加载游戏…', zht: '正在載入遊戲…', ko: '게임 불러오는 중…', ru: 'Загрузка игры…',
    de: 'Spiel wird geladen…',
  },
  starting: {
    es: '¡Ya casi está!', en: 'Almost there!', pt: 'Quase lá!', fr: 'Presque prêt !', ja: 'もうすぐです！',
    zh: '马上就好！', zht: '馬上就好！', ko: '거의 다 됐어요!', ru: 'Почти готово!',
    de: 'Gleich geht’s los!',
  },
  tip: { es: 'Consejo', en: 'Tip', pt: 'Dica', fr: 'Astuce', ja: 'ヒント', zh: '提示', zht: '提示', ko: '팁', ru: 'Совет', de: 'Tipp' },
  // Graphics backend (Ajustes → Pantalla → Motor gráfico) gone wrong: the GPU process kept crashing.
  gpuTitle: {
    es: 'La tarjeta gráfica está fallando', en: 'The graphics card keeps failing', pt: 'A placa de vídeo está falhando', fr: 'La carte graphique plante',
    ja: 'グラフィックカードでエラーが続いています', zh: '显卡反复出错', zht: '顯示卡反覆出錯', ko: '그래픽 카드 오류가 계속됩니다', ru: 'Видеокарта даёт сбои',
    de: 'Die Grafikkarte macht Probleme',
  },
  gpuBody: {
    es: 'El juego ha perdido la tarjeta gráfica varias veces. Probar otro motor gráfico ({b}) suele arreglarlo con algunos drivers. Se puede cambiar cuando quieras en Ajustes → Pantalla.',
    en: 'The game lost the graphics card several times. Another graphics backend ({b}) usually fixes it with some drivers. You can change it any time in Settings → Display.',
    pt: 'O jogo perdeu a placa de vídeo várias vezes. Outro motor gráfico ({b}) costuma resolver com alguns drivers. Você pode mudar quando quiser em Configurações → Tela.',
    fr: 'Le jeu a perdu la carte graphique plusieurs fois. Un autre moteur graphique ({b}) règle souvent le problème avec certains pilotes. Modifiable à tout moment dans Réglages → Affichage.',
    ja: 'ゲームがグラフィックカードを何度か失いました。別の描画エンジン（{b}）で直ることがあります。設定 → 画面表示でいつでも変更できます。',
    zh: '游戏多次失去显卡。换用其他图形引擎（{b}）通常能解决某些驱动的问题。可随时在设置 → 显示中更改。',
    zht: '遊戲多次失去顯示卡。換用其他圖形引擎（{b}）通常能解決某些驅動的問題。可隨時在設定 → 顯示中更改。',
    ko: '게임이 그래픽 카드를 여러 번 잃었습니다. 다른 그래픽 엔진({b})으로 바꾸면 일부 드라이버에서 해결됩니다. 설정 → 화면에서 언제든 바꿀 수 있습니다.',
    ru: 'Игра несколько раз теряла видеокарту. Другой графический движок ({b}) часто помогает с некоторыми драйверами. Его можно сменить в любой момент: Настройки → Экран.',
    de: 'Das Spiel hat die Grafikkarte mehrmals verloren. Ein anderes Grafik-Backend ({b}) behebt das bei manchen Treibern meistens. Du kannst es jederzeit unter Einstellungen → Anzeige ändern.',
  },
  gpuTry: {
    es: 'Probar y reiniciar', en: 'Try it and restart', pt: 'Testar e reiniciar', fr: 'Essayer et redémarrer', ja: '試して再起動',
    zh: '尝试并重启', zht: '嘗試並重新啟動', ko: '적용하고 재시작', ru: 'Попробовать и перезапустить',
    de: 'Ausprobieren und neu starten',
  },
} satisfies Record<string, Record<Lang, string>>;

export type TextKey = keyof typeof T;
export const tr = (l: Lang, k: TextKey, vars?: Record<string, string>) =>
  T[k][l].replace(/\{(\w+)\}/g, (m, v) => vars?.[v] ?? m);

/**
 * Tips of the loading screen, one at a time. Keys are the default ones (the game's own tips swap in the player's
 * binding; here, before the game, they can't).
 */
const TIPS: Record<Lang, string[]> = {
  es: [
    'Pulsa R cuando la Ultimate esté cargada: se carga luchando.',
    'Las Poké Balls del mapa guardan objetos: ábrelas con E.',
    'Deslízate con Shift para esquivar los ataques fuertes de los jefes.',
    'Quédate dentro del círculo de un altar para cargar su bendición.',
    'Cada zona termina con su guardián: derrótalo para abrir el portal.',
    'Mantén el salto para planear y llegar a lo alto de las mesetas.',
    'Supera el reto de un Pokémon de la Liga y captúralo para jugar con él.',
    '«Guardar y salir», en la pausa, guarda una partida en solitario para seguirla otro día.',
    'El cooperativo es de 2 a 4 entrenadores: invita a tus amigos o usa «Buscar partida».',
    'F11 cambia entre ventana y pantalla completa. Más opciones en Ajustes → Pantalla.',
  ],
  en: [
    'Press R when your Ultimate is charged: it charges as you fight.',
    'Poké Balls around the map hold items: open them with E.',
    'Slide with Shift to dodge the bosses\' big attacks.',
    'Stay inside an altar\'s circle to charge its blessing.',
    'Every zone ends with its guardian: defeat it to open the portal.',
    'Hold jump to glide and reach the top of the plateaus.',
    'Beat a League Pokémon\'s challenge and catch it to play as it.',
    '«Save and quit» in the pause menu keeps a solo run to continue another day.',
    'Co-op is for 2 to 4 trainers: invite your friends or use «Find a match».',
    'F11 switches between window and fullscreen. More options in Settings → Display.',
  ],
  pt: [
    'Aperte R quando a Ultimate estiver carregada: ela carrega lutando.',
    'As Poké Balls do mapa guardam itens: abra-as com E.',
    'Deslize com Shift para desviar dos ataques fortes dos chefes.',
    'Fique dentro do círculo de um altar para carregar sua bênção.',
    'Cada zona termina com seu guardião: derrote-o para abrir o portal.',
    'Segure o pulo para planar e chegar ao alto dos platôs.',
    'Supere o desafio de um Pokémon da Liga e capture-o para jogar com ele.',
    '«Salvar e sair», na pausa, guarda uma partida solo para continuar outro dia.',
    'O cooperativo é de 2 a 4 treinadores: convide seus amigos ou use «Procurar partida».',
    'F11 alterna entre janela e tela cheia. Mais opções em Configurações → Tela.',
  ],
  fr: [
    'Appuyez sur R quand l\'Ultime est chargée : elle se charge en combattant.',
    'Les Poké Balls de la carte contiennent des objets : ouvrez-les avec E.',
    'Glissez avec Maj pour esquiver les grosses attaques des boss.',
    'Restez dans le cercle d\'un autel pour charger sa bénédiction.',
    'Chaque zone se termine par son gardien : battez-le pour ouvrir le portail.',
    'Maintenez le saut pour planer et atteindre le haut des plateaux.',
    'Relevez le défi d\'un Pokémon de la Ligue et capturez-le pour jouer avec.',
    '« Sauvegarder et quitter », dans la pause, garde une partie solo pour la reprendre un autre jour.',
    'La coop se joue de 2 à 4 dresseurs : invitez vos amis ou utilisez « Trouver une partie ».',
    'F11 bascule entre fenêtre et plein écran. Plus d\'options dans Réglages → Affichage.',
  ],
  ja: [
    'アルティメットが溜まったらRで発動。戦うほど溜まります。',
    'マップのモンスターボールにはアイテムが入っています。Eで開けよう。',
    'Shiftでスライディングして、ボスの強力な攻撃をかわそう。',
    '祭壇の円の中にとどまると、その加護が溜まります。',
    '各ゾーンの最後には守護者が待っています。倒すとポータルが開きます。',
    'ジャンプを長押しで滑空。高台の上まで行けます。',
    'リーグのポケモンのチャレンジを達成して捕まえると、そのポケモンで遊べます。',
    'ポーズの「セーブして終わる」で、ソロのランを後日続けられます。',
    '協力プレイは2〜4人。フレンドを誘うか「マッチを探す」を使おう。',
    'F11でウィンドウとフルスクリーンを切り替え。詳しくは設定 → 画面表示。',
  ],
  zh: [
    '终极技充满后按 R 释放：战斗中会不断充能。',
    '地图上的精灵球里有道具：按 E 打开。',
    '按 Shift 滑铲，躲开首领的强力攻击。',
    '站在祭坛的圆圈里，就能充能它的祝福。',
    '每个区域最后都有守护者：击败它即可打开传送门。',
    '按住跳跃可以滑翔，登上高台。',
    '完成联盟宝可梦的挑战并捕捉它，就能使用它来游玩。',
    '暂停菜单中的「保存并退出」能保存单人对局，改天继续。',
    '合作模式支持 2 到 4 名训练家：邀请好友或使用「寻找对局」。',
    'F11 切换窗口与全屏。更多选项见设置 → 显示。',
  ],
  zht: [
    '終極技充滿後按 R 施放：戰鬥中會不斷充能。',
    '地圖上的精靈球裡有道具：按 E 打開。',
    '按 Shift 滑鏟，躲開首領的強力攻擊。',
    '站在祭壇的圓圈裡，就能充能它的祝福。',
    '每個區域最後都有守護者：擊敗它即可打開傳送門。',
    '按住跳躍可以滑翔，登上高台。',
    '完成聯盟寶可夢的挑戰並捕捉它，就能使用它來遊玩。',
    '暫停選單中的「儲存並退出」能保存單人對局，改天繼續。',
    '合作模式支援 2 到 4 名訓練家：邀請好友或使用「尋找對局」。',
    'F11 切換視窗與全螢幕。更多選項見設定 → 顯示。',
  ],
  ko: [
    '얼티밋이 충전되면 R을 누르세요. 싸울수록 충전됩니다.',
    '맵의 몬스터볼에는 아이템이 들어 있어요. E로 여세요.',
    'Shift로 슬라이딩해서 보스의 강력한 공격을 피하세요.',
    '제단의 원 안에 머무르면 축복이 충전됩니다.',
    '각 구역의 끝에는 수호자가 있어요. 쓰러뜨리면 포털이 열립니다.',
    '점프를 길게 누르면 활공해서 고원 위까지 갈 수 있어요.',
    '리그 포켓몬의 도전을 달성하고 잡으면 그 포켓몬으로 플레이할 수 있어요.',
    '일시정지의 「저장하고 나가기」로 솔로 판을 다른 날 이어 할 수 있어요.',
    '협동은 2~4명의 트레이너가 함께해요. 친구를 초대하거나 「매치 찾기」를 쓰세요.',
    'F11로 창 모드와 전체 화면을 바꿉니다. 더 많은 옵션은 설정 → 화면.',
  ],
  ru: [
    'Нажмите R, когда Ультимейт заряжен: он заряжается в бою.',
    'В покеболах на карте лежат предметы: открывайте их клавишей E.',
    'Скользите с Shift, чтобы уходить от мощных атак боссов.',
    'Стойте в круге алтаря, чтобы зарядить его благословение.',
    'Каждая зона заканчивается стражем: победите его, чтобы открыть портал.',
    'Удерживайте прыжок, чтобы планировать и забираться на плато.',
    'Пройдите испытание покемона Лиги и поймайте его, чтобы играть за него.',
    '«Сохранить и выйти» в меню паузы сохраняет одиночный забег, чтобы продолжить в другой день.',
    'Кооператив — от 2 до 4 тренеров: пригласите друзей или нажмите «Найти игру».',
    'F11 переключает окно и полный экран. Больше настроек: Настройки → Экран.',
  ],
  de: [
    'Drücke R, wenn dein Ultimate geladen ist: Es lädt sich im Kampf auf.',
    'Die Pokébälle auf der Karte enthalten Items: Öffne sie mit E.',
    'Rutsche mit Shift, um den starken Angriffen der Bosse auszuweichen.',
    'Bleib im Kreis eines Altars, um seinen Segen aufzuladen.',
    'Jedes Gebiet endet mit seinem Wächter: Besiege ihn, um das Portal zu öffnen.',
    'Halte Springen gedrückt, um zu gleiten und auf die Hochebenen zu kommen.',
    'Meistere die Herausforderung eines Liga-Pokémon und fange es, um mit ihm zu spielen.',
    '„Speichern und beenden“ im Pausenmenü sichert eine Solo-Runde, damit du sie an einem anderen Tag fortsetzen kannst.',
    'Koop ist für 2 bis 4 Trainer: Lade Freunde ein oder nutze „Runde suchen“.',
    'F11 wechselt zwischen Fenster und Vollbild. Mehr Optionen unter Einstellungen → Anzeige.',
  ],
};
export const tips = (l: Lang) => TIPS[l];
