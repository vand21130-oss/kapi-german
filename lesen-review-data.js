// Vietnamese sentence translations and answer evidence for the existing tasks.
// German texts, answer keys and vocabulary stay in their original source files.
// Evidence tuples: [passage key, zero-based sentence index, exact German keywords].
const LESEN_REVIEW_DATA = {
    lesen_t1_konsum: {
        passages: {
            'people.a': [
                'Trước đây tôi thường mua đồ mới, mặc dù đồ cũ vẫn còn dùng được.',
                'Đặc biệt khi mua quần áo, tôi dễ bị những đợt giảm giá hấp dẫn.',
                'Giờ đây, trước mỗi lần mua, tôi tự hỏi liệu mình có thực sự cần món đồ đó không.',
                'Nếu có thể, tôi mang thiết bị hỏng đi sửa.',
                'Điều này không phải lúc nào cũng tiết kiệm tiền ngay, nhưng tôi không muốn tiếp tục ủng hộ xã hội dùng rồi vứt nữa.',
                'Dù vậy, tôi vẫn không sống hoàn toàn tối giản: những thứ tôi thường dùng và thực sự yêu thích vẫn được giữ lại.'
            ],
            'people.b': [
                'Sống bền vững là quan trọng, nhưng phải phù hợp với cuộc sống hằng ngày của tôi.',
                'Tôi làm việc nhiều giờ nên đặt mua khá nhiều thứ trên mạng.',
                'Tôi thấy phiền vì phải trả phí vận chuyển và đôi khi nhận nhiều kiện hàng khác nhau.',
                'Nhưng việc khiếu nại khi một sản phẩm không phù hợp còn khó chịu hơn.',
                'Khi đó tôi mất rất nhiều thời gian.',
                'Vì vậy tôi mua ít thường xuyên hơn, nhưng chọn những cửa hàng mà tôi từng có trải nghiệm tốt.',
                'Tôi không muốn từ bỏ hoàn toàn sự tiện lợi.'
            ],
            'people.c': [
                'Với tôi, vấn đề không nằm ở việc mua mà ở việc cho đồ đi.',
                'Nhiều đồ dùng gắn với kỷ niệm: chiếc cốc từ căn hộ ở ghép đầu tiên, sách thời đại học hay chiếc áo khoác của bà.',
                'Tất nhiên tôi không cần tất cả những thứ đó.',
                'Dù vậy, tôi không thể chia tay một nửa tài sản của mình chỉ trong một cuối tuần.',
                'Tôi phân loại để bỏ bớt đồ từng ít một và nghỉ sau mỗi thùng.',
                'Như vậy, quyết định này vẫn nằm trong mức tôi có thể chịu được.'
            ],
            'people.d': [
                'Không phải gia đình nào cũng cần sở hữu một chiếc máy khoan, một cái thang và mười dụng cụ ít khi dùng.',
                'Trong khu phố của chúng tôi có một chiếc tủ chung để mọi người mượn những thứ như vậy.',
                'Nhờ đó, chúng tôi bảo vệ tài nguyên và đồng thời có dịp trò chuyện với hàng xóm.',
                'Một số người sợ đồ sẽ bị hỏng hoặc không được trả lại.',
                'Ở chỗ chúng tôi, các quy định rõ ràng và một danh sách giúp giải quyết việc này.',
                'Đến nay, mọi việc diễn ra suôn sẻ đến ngạc nhiên.'
            ]
        },
        questions: {
            1: { vi:'Ai gắn đồ vật với những kỷ niệm cá nhân rất sâu sắc?', evidence:[['people.c',1,['hängen Erinnerungen']]], link:'persönliche Erinnerungen ↔ hängen Erinnerungen: đồ dùng gắn với kỷ niệm.' },
            2: { vi:'Ai sử dụng tài sản chung thay vì tự mua mọi thứ?', evidence:[['people.d',1,['gemeinsamen Schrank','ausleihen']]], link:'gemeinschaftlicher Besitz ↔ gemeinsamer Schrank; nutzen ↔ ausleihen.' },
            3: { vi:'Ai có ý thức bảo vệ môi trường nhưng vẫn không muốn từ bỏ sự tiện lợi?', evidence:[['people.b',0,['Nachhaltigkeit']],['people.b',6,['Komfort','nicht völlig verzichten']]], link:'Umweltbewusstsein ↔ Nachhaltigkeit; Bequemlichkeit ↔ Komfort. Chú ý nicht völlig: không từ bỏ hoàn toàn.' },
            4: { vi:'Ai cố gắng sửa lại những thứ không còn hoạt động?', evidence:[['people.a',3,['Defekte Geräte','reparieren']]], link:'funktionsunfähig ↔ defekt; wieder instand setzen ↔ reparieren.' },
            5: { vi:'Trước đây ai dễ bị lôi kéo vào những lần mua sắm ngoài kế hoạch?', evidence:[['people.a',1,['leicht von Rabatten locken']]], link:'zu Käufen verleitet werden ↔ sich von Rabatten locken lassen: bị giảm giá dụ mua.' },
            6: { vi:'Ai thấy việc chia sẻ đồ dùng cũng có lợi về mặt xã hội?', evidence:[['people.d',2,['mit den Nachbarn ins Gespräch']]], link:'sozialer Vorteil ↔ ins Gespräch kommen: tạo dịp giao tiếp với hàng xóm.' },
            7: { vi:'Ai thấy việc trả lại hàng không phù hợp đặc biệt phiền phức?', evidence:[['people.b',3,['Noch nerviger','Reklamation','nicht passt']]], link:'besonders lästig ↔ noch nerviger; ungeeignet ↔ nicht passen.' },
            8: { vi:'Ai cần tiến hành chậm rãi khi bỏ bớt đồ?', evidence:[['people.c',4,['portionsweise','Pause']]], link:'langsames Vorgehen ↔ portionsweise + Pause: làm từng ít một và nghỉ.' },
            9: { vi:'Ai muốn tiêu dùng có ý thức hơn nhưng vẫn giữ lại một số món đồ mình yêu thích?', evidence:[['people.a',2,['wirklich brauche']],['people.a',5,['wirklich mag','dürfen bleiben']]], link:'bewusster konsumieren ↔ hỏi có thật sự cần; không bỏ đồ yêu thích ↔ dürfen bleiben.' }
        }
    },
    lesen_t1_hybridarbeit: {
        passages: {
            'people.a': [
                'Từ khi làm việc tại nhà hai ngày mỗi tuần, tôi sắp xếp việc cân bằng giữa công việc và gia đình dễ dàng hơn nhiều.',
                'Buổi sáng tôi có thể đưa con đến trường và còn tiết kiệm thời gian đi làm.',
                'Tuy nhiên, ở nhà tôi cần giờ làm việc cố định.',
                'Nếu không, tôi sẽ tranh thủ làm việc nhà và mất khả năng theo dõi mọi việc.',
                'Vì vậy, với tôi sự kết hợp là lý tưởng: làm những việc cần tập trung ở nhà và họp tại văn phòng.'
            ],
            'people.b': [
                'Trong căn hộ nhỏ của mình, tôi hầu như không thể tập trung.',
                'Bàn ăn đồng thời là bàn làm việc, mà hàng xóm cũng chẳng yên tĩnh.',
                'Ở văn phòng đôi khi đồng nghiệp đến nói chuyện với tôi, nhưng tôi có bàn làm việc tốt và đầy đủ thiết bị kỹ thuật.',
                'Ngoài ra, nhiều ý tưởng chỉ nảy sinh trong những cuộc trò chuyện tự nhiên.',
                'Tôi sẵn lòng đến làm trực tiếp gần như mỗi ngày.'
            ],
            'people.c': [
                'Là người đi làm xa mỗi ngày, trước đây tôi mất gần hai tiếng trên tàu.',
                'Từ khi công ty cho phép làm việc từ xa, tôi có thêm rất nhiều thời gian.',
                'Tuy vậy, tôi không muốn bỏ hẳn văn phòng, vì hướng dẫn nhân viên mới qua mạng khá khó.',
                'Với tôi, điều quan trọng là các nhóm thống nhất những ngày cùng đến văn phòng.',
                'Nếu không, có người đi đến văn phòng rồi ngồi đó một mình trong cuộc họp trực tuyến.'
            ],
            'people.d': [
                'Việc một người có ngồi ở văn phòng hay không chẳng nói lên nhiều về hiệu quả làm việc của họ.',
                'Nhiệm vụ rõ ràng và thời hạn thực tế mới quan trọng hơn.',
                'Tuy nhiên, trong nhóm tôi, khối lượng công việc đã tăng từ khi ai cũng liên tục có thể được liên lạc.',
                'Một số người thậm chí trả lời tin nhắn vào tối muộn.',
                'Vì vậy chúng tôi cần những giới hạn mang tính bắt buộc.',
                'Làm việc từ xa chỉ là tiến bộ nếu sự tự do có được không lập tức bị lấp đầy bởi công việc bổ sung.'
            ]
        },
        questions: {
            1: { vi:'Ai cho rằng nhóm cần có ngày cùng đến văn phòng?', evidence:[['people.c',3,['gemeinsame Präsenztage']]], link:'gemeinsamer Bürotag ↔ gemeinsame Präsenztage: ngày có mặt trực tiếp cùng nhau.' },
            2: { vi:'Ai khó làm việc tốt trong căn hộ của mình?', evidence:[['people.b',0,['kaum konzentrieren']],['people.b',1,['nicht gerade leise']]], link:'schlecht arbeiten ↔ kaum konzentrieren; tiếng ồn cũng là trở ngại.' },
            3: { vi:'Ai cảnh báo rằng làm việc linh hoạt có thể dẫn đến làm nhiều hơn?', evidence:[['people.d',2,['Arbeitsmenge','gestiegen']],['people.d',5,['zusätzlicher Arbeit']]], link:'Mehrarbeit ↔ Arbeitsmenge gestiegen / zusätzliche Arbeit.' },
            4: { vi:'Ai thấy làm việc tại nhà có lợi cho gia đình?', evidence:[['people.a',0,['Beruf und Familie']],['people.a',1,['mein Kind','zur Schule bringen']]], link:'familiäre Vorteile ↔ sắp xếp gia đình tốt hơn, đưa con đi học.' },
            5: { vi:'Ai tiết kiệm được đặc biệt nhiều thời gian đi lại nhờ làm việc từ xa?', evidence:[['people.c',0,['fast zwei Stunden']],['people.c',1,['gewinne ich viel Zeit']]], link:'Reisezeit sparen ↔ trước đây đi tàu gần hai tiếng, giờ lấy lại thời gian đó.' },
            6: { vi:'Ai coi trọng ý tưởng nảy sinh ngoài kế hoạch khi trao đổi trực tiếp?', evidence:[['people.b',3,['Ideen','spontanen Gespräch']]], link:'ungeplant ↔ spontan; direkter Austausch ↔ Gespräch.' },
            7: { vi:'Ai cần quy tắc rõ ràng để không làm những việc khác khi ở nhà?', evidence:[['people.a',2,['feste Arbeitszeiten']],['people.a',3,['Hausarbeit','verliere den Überblick']]], link:'klare Regeln ↔ feste Arbeitszeiten; andere Aufgaben ↔ Hausarbeit.' },
            8: { vi:'Ai thấy kết quả công việc quan trọng hơn địa điểm làm việc?', evidence:[['people.d',0,['wenig über seine Leistung']],['people.d',1,['Wichtiger','klare Aufgaben']]], link:'Sitzen im Büro không chứng minh Leistung; nội dung công việc mới quan trọng.' },
            9: { vi:'Ai muốn làm những công việc khác nhau ở những địa điểm khác nhau?', evidence:[['people.a',4,['konzentrierte Aufgaben zu Hause','Besprechungen im Büro']]], link:'unterschiedliche Tätigkeiten ↔ việc cần tập trung và họp; unterschiedliche Orte ↔ nhà và văn phòng.' }
        }
    }
};

Object.assign(LESEN_REVIEW_DATA, {
    lesen_t4_vier_tage: {
        passages: {
            'opinions.a': ['Với cha mẹ, thêm một ngày nghỉ có thể cải thiện đáng kể việc cân bằng công việc và gia đình.', 'Khi đó, lịch hẹn, mua sắm và thời gian ở bên nhau không phải bị dồn hết vào cuối tuần.'],
            'opinions.b': ['Đợt thử nghiệm của chúng tôi thành công vì trước đó chúng tôi đã bỏ những cuộc họp không cần thiết.', 'Ít cuộc họp hơn và trách nhiệm rõ ràng hơn giúp chúng tôi tăng hiệu quả mà không phải làm lâu hơn.'],
            'opinions.c': ['Tôi muốn chỉ làm bốn ngày, nhưng không thể mất hai mươi phần trăm lương.', 'Chừng nào còn chưa rõ tiền lương có giữ nguyên hay không, mô hình này chưa thực sự là một lựa chọn cho tôi.'],
            'opinions.d': ['Khách hàng của chúng tôi cần được hỗ trợ từ thứ Hai đến thứ Sáu.', 'Vì vậy, tuần làm việc bốn ngày chỉ hoạt động nếu các nhóm chọn những ngày nghỉ khác nhau.', 'Điều này làm tăng công sức cần thiết để phối hợp.'],
            'opinions.e': ['Trong ngành chăm sóc, không thể đơn giản phân chia công việc vào ít hơn một ngày.', 'Bệnh nhân vẫn cần được chăm sóc.', 'Nếu không có thêm nhân viên, điều kiện làm việc thậm chí sẽ xấu đi.'],
            'opinions.f': ['Với người đi làm xa, ít đi một ngày làm cũng có nghĩa là ít đi một chuyến.', 'Điều đó tiết kiệm thời gian, tiền và khí thải.', 'Đặc biệt trên quãng đường dài, tác dụng đi kèm này hoàn toàn không phải là nhỏ.'],
            'opinions.g': ['Doanh nghiệp nên thử mô hình vài tháng trước và thu thập dữ liệu.', 'Chỉ sau đó mới có thể đánh giá mô hình có hợp với ngành và nhóm hay không.', 'Đổi ngay sang mô hình lâu dài sẽ là quá vội vàng.'],
            'opinions.h': ['Nếu vẫn nhồi cùng khối lượng việc vào bốn ngày, kết quả là bốn ngày cực dài và mệt mỏi, chứ không phải có thêm một ngày nghỉ.', 'Vì vậy, điều quyết định là thực sự giảm nhiệm vụ.'],
            example: ['Có thêm thời gian cho con cái và công việc riêng.']
        },
        questions: {
            22: { vi:'Hiệu quả hơn nhờ ít cuộc họp hơn.', evidence:[['opinions.b',1,['Weniger Sitzungen','Leistungsfähigkeit zu steigern']]], link:'Besprechungen ↔ Sitzungen; effizienter ↔ Leistungsfähigkeit steigern.' },
            23: { vi:'Muốn luôn liên lạc được thì cần nghỉ vào những ngày lệch nhau.', evidence:[['opinions.d',0,['Montag bis Freitag']],['opinions.d',1,['freien Tage unterschiedlich']]], link:'versetzte freie Tage ↔ freie Tage unterschiedlich legen, để vẫn phục vụ khách đủ năm ngày.' },
            24: { vi:'Không phải nghề nào cũng áp dụng được nếu không có thêm nhân lực.', evidence:[['opinions.e',1,['weiterhin Versorgung']],['opinions.e',2,['Ohne zusätzliches Personal']]], link:'zusätzliche Kräfte ↔ zusätzliches Personal. Nhu cầu chăm sóc bệnh nhân không mất đi vào ngày nghỉ.' },
            25: { vi:'Quãng đường đi làm cũng đóng vai trò.', evidence:[['opinions.f',0,['Pendler','eine Fahrt weniger']]], link:'Arbeitsweg ↔ Fahrt của Pendler, tức người đi làm xa.' },
            26: { vi:'Trước khi quyết định lâu dài, hãy thử trước.', evidence:[['opinions.g',0,['zunächst','testen']],['opinions.g',2,['dauerhafte Umstellung','voreilig']]], link:'erst ausprobieren ↔ zunächst testen; sofort dauerhaft áp dụng bị xem là vội vàng.' },
            27: { vi:'Cùng nhiệm vụ nhưng ít thời gian hơn sẽ tăng gánh nặng.', evidence:[['opinions.h',0,['dieselbe Arbeitsmenge','extrem lange und anstrengende Tage']]], link:'gleiche Aufgaben ↔ dieselbe Arbeitsmenge; Belastung ↔ lange und anstrengende Tage.' }
        }
    },
    lesen_t4_ehrenamt: {
        passages: {
            'opinions.a': ['Khi mới chuyển đến thành phố, tôi không quen ai.', 'Trong dự án vườn cộng đồng vì lợi ích chung, tôi nhanh chóng gặp những người cùng chí hướng.', 'Nhờ cùng tham gia hoạt động, chúng tôi đã trở thành những người bạn thực sự.'],
            'opinions.b': ['Nhiều hội dành quá nhiều thời gian cho biểu mẫu, đơn đề nghị và thanh quyết toán.', 'Người muốn tình nguyện giúp đỡ không nên phải học một khóa quản lý hành chính trước.', 'Bớt thủ tục quan liêu sẽ khiến nhiều người có động lực hơn rõ rệt.'],
            'opinions.c': ['Ngoài công việc và gia đình, tôi hầu như không có thời gian rảnh có thể lên lịch trước.', 'Tôi thích hỗ trợ các hoạt động, nhưng không thể nhận nhiệm vụ cố định vào mỗi thứ Tư.', 'Cảm giác có lỗi này lại khiến tôi ngại tham gia hơn.'],
            'opinions.d': ['Khu chúng tôi thiếu một con đường an toàn đến trường.', 'Chỉ sau khi phụ huynh thu thập dữ liệu, tổ chức trao đổi và gây sức ép công khai, thành phố mới thay đổi cách điều tiết giao thông.', 'Vì vậy, hoạt động cộng đồng tại địa phương có thể tạo thay đổi rất cụ thể.'],
            'opinions.e': ['Hoạt động tình nguyện thường được đánh giá tích cực khi xin việc.', 'Điều này dễ hiểu, vì qua đó ta học cách tổ chức, giao tiếp và chịu trách nhiệm về hành động của mình.', 'Tuy nhiên, không nên chỉ xem nó là khóa đào tạo nghề nghiệp miễn phí.'],
            'opinions.f': ['Không phải ai cũng có thể cam kết lâu dài.', 'Các nền tảng số hiện kết nối những nhiệm vụ nhỏ chỉ kéo dài một giờ.', 'Những hình thức linh hoạt này hạ rào cản và tiếp cận những người mà hội truyền thống khó thu hút.'],
            'opinions.g': ['Người dân không thể nhận hết mọi nhiệm vụ xã hội trong khi nhà nước rút lui.', 'Tình nguyện có thể bổ sung dịch vụ chuyên nghiệp, nhưng không bao giờ thay thế được ngân sách đầy đủ và nhân lực có chuyên môn.'],
            'opinions.h': ['Những hoạt động chung đều đặn củng cố sự gắn kết.', 'Đặc biệt, người cao tuổi cảm thấy kinh nghiệm của mình có ích và bớt cô đơn.', 'Điều này mang lại lợi ích cho cả khu dân cư, chứ không chỉ từng người.'],
            example: ['Tìm bạn bè mới qua những sở thích chung.']
        },
        questions: {
            22: { vi:'Thủ tục hành chính gây khó khăn cho hoạt động tình nguyện.', evidence:[['opinions.b',0,['Formularen','Anträgen','Abrechnungen']],['opinions.b',2,['Weniger Bürokratie']]], link:'Verwaltung ↔ biểu mẫu, đơn, thanh quyết toán; weniger Bürokratie là điều được đề nghị.' },
            23: { vi:'Hoạt động cộng đồng có thể trực tiếp thay đổi môi trường xung quanh.', evidence:[['opinions.d',1,['änderte die Stadt die Verkehrsführung']]], link:'Umgebung verändern ↔ thành phố đổi cách tổ chức giao thông sau sáng kiến của phụ huynh.' },
            24: { vi:'Ngoài ra, người tham gia còn có được kỹ năng hữu ích cho nghề nghiệp.', evidence:[['opinions.e',0,['Bei Bewerbungen']],['opinions.e',1,['Organisation','Kommunikation','Verantwortung']]], link:'beruflich nützliche Kompetenzen ↔ những kỹ năng này được đánh giá tốt khi Bewerbungen.' },
            25: { vi:'Hoạt động ngắn và linh hoạt tiếp cận được thêm nhiều nhóm người.', evidence:[['opinions.f',1,['nur eine Stunde']],['opinions.f',2,['flexiblen Formen','erreichen Menschen']]], link:'kurze Einsätze ↔ eine Stunde; weitere Gruppen ↔ người mà hội truyền thống khó tiếp cận.' },
            26: { vi:'Tình nguyện viên không được thay thế những dịch vụ thuộc trách nhiệm nhà nước.', evidence:[['opinions.g',1,['ergänzen','niemals','ersetzen']]], link:'ergänzen ≠ ersetzen: có thể bổ sung, nhưng niemals thay ngân sách và nhân lực chuyên môn.' },
            27: { vi:'Những nhiệm vụ chung giúp chống lại sự cô đơn.', evidence:[['opinions.h',1,['weniger allein']]], link:'gegen Einsamkeit ↔ weniger allein; regelmäßige gemeinsame Aktivitäten là nguyên nhân.' }
        }
    },
    lesen_t5_bibliothek: {
        passages: {
            'headings.a':['Đăng ký và thẻ thư viện.'], 'headings.b':['Thời hạn mượn và gia hạn.'], 'headings.c':['Mất thẻ.'], 'headings.d':['Tài liệu số.'],
            'headings.e':['Ứng xử trong phòng thư viện.'], 'headings.f':['Tủ khóa và bảo quản đồ.'], 'headings.g':['Phòng làm việc và phòng nhóm.'], 'headings.h':['Phí sao chụp.'],
            example:['Với thẻ còn hiệu lực, có thể truy cập sách điện tử và cơ sở dữ liệu cả khi ở ngoài thư viện.', 'Khi tư cách thành viên hết hạn, quyền truy cập tự động bị khóa.'],
            'sections.28':['Khi đăng ký, phải xuất trình căn cước hoặc hộ chiếu còn hiệu lực.', 'Sinh viên đã ghi danh tại trường đại học trong địa phương được giảm phí khi xuất trình giấy xác nhận sinh viên.', 'Thay đổi địa chỉ phải được thông báo cho thư viện.'],
            'sections.29':['Thông thường, có thể mượn sách trong bốn tuần.', 'Có thể gia hạn nếu tài liệu chưa được người khác đặt trước và chưa đạt thời gian mượn tối đa.', 'Sau khi hết thời hạn, người mượn phải trả phí trả chậm.'],
            'sections.30':['Có thể dùng chỗ làm việc cá nhân mà không cần đăng ký.', 'Ngược lại, phòng nhóm phải đặt trước và chỉ được đặt tối đa hai giờ mỗi ngày.', 'Nếu phòng đã đặt không có người đến trong mười lăm phút, thư viện có thể giao phòng cho người khác.']
        },
        questions: {
            28: { vi:'Điều 28', evidence:[['sections.28',0,['Zur Anmeldung','Personalausweis','Reisepass']]], link:'Anmeldung là đăng ký. Toàn đoạn nói về giấy tờ và thông tin khi đăng ký, không phải mất thẻ.' },
            29: { vi:'Điều 29', evidence:[['sections.29',0,['vier Wochen']],['sections.29',1,['Verlängerung','vorbestellt']]], link:'Leihfristen ↔ vier Wochen; Verlängerung chỉ được nếu chưa đặt trước và chưa vượt hạn tối đa.' },
            30: { vi:'Điều 30', evidence:[['sections.30',0,['Einzelarbeitsplätze']],['sections.30',1,['Gruppenräume','buchungspflichtig']]], link:'Arbeits- und Gruppenräume ↔ chỗ làm cá nhân và phòng nhóm; trọng tâm là cách dùng/đặt phòng.' }
        }
    },
    lesen_t5_homeoffice_regeln: {
        passages: {
            'headings.a':['Phê duyệt và điều kiện.'], 'headings.b':['Bảo vệ dữ liệu và tài liệu mật.'], 'headings.c':['Thời gian làm việc và khả năng liên lạc.'], 'headings.d':['Sức khỏe tại nơi làm việc.'],
            'headings.e':['Chi phí và trang thiết bị kỹ thuật.'], 'headings.f':['Tai nạn trong khi làm việc.'], 'headings.g':['Chấm dứt thỏa thuận.'], 'headings.h':['Sử dụng thiết bị cá nhân.'],
            example:['Thành viên gia đình không được xem dữ liệu cá nhân.', 'Bản in có dữ liệu nhạy cảm phải được cất trong đồ chứa khóa kín và tiêu hủy tại công ty.'],
            'sections.28':['Trước khi bắt đầu, việc làm từ xa phải được thỏa thuận bằng văn bản với quản lý có trách nhiệm.', 'Điều kiện là có thể làm nhiệm vụ ngoài cơ sở công ty mà không ảnh hưởng đến hoạt động của doanh nghiệp.', 'Không có quyền tự động được làm từ xa.'],
            'sections.29':['Áp dụng giờ làm linh hoạt của công ty và thời gian nghỉ theo luật.', 'Nhân viên phải có thể được liên lạc trong khung giờ cốt lõi đã thống nhất.', 'Ngoài khung giờ này, không có nghĩa vụ trả lời tin nhắn ngay.'],
            'sections.30':['Công ty cung cấp máy tính xách tay, bộ nguồn và phần mềm cần thiết.', 'Chương trình bổ sung phải được bộ phận IT cho phép sử dụng.', 'Chi phí cá nhân thường xuyên như điện hoặc internet không được hoàn lại, trừ khi có thỏa thuận riêng khác.']
        },
        questions: {
            28: { vi:'Điều 28', evidence:[['sections.28',0,['schriftlich','Führungskraft vereinbart']],['sections.28',1,['Voraussetzung']]], link:'Genehmigung ↔ schriftlich vereinbaren; Voraussetzungen ↔ điều kiện không ảnh hưởng công ty.' },
            29: { vi:'Điều 29', evidence:[['sections.29',0,['Gleitzeit','Ruhezeiten']],['sections.29',1,['Kernzeit','erreichbar']]], link:'Arbeitszeit ↔ Gleitzeit / Kernzeit; Erreichbarkeit ↔ erreichbar sein.' },
            30: { vi:'Điều 30', evidence:[['sections.30',0,['Laptop','Software']],['sections.30',2,['Kosten','nicht erstattet']]], link:'technische Ausstattung ↔ Laptop, Netzteil, Software; Kosten ↔ quy định hoàn chi phí.' }
        }
    }
});

Object.assign(LESEN_REVIEW_DATA, {
    lesen_t3_aufmerksamkeit: {
        passages: {
            'article.0': ['Chỉ định nhìn điện thoại một chút, vậy mà đột nhiên hai mươi phút đã trôi qua.', 'Nhiều người biết cảm giác này.', 'Các nhà nghiên cứu giải thích rằng một phần nguyên nhân là mạng xã hội liên tục đưa ra nội dung mới, không đoán trước được.', 'Một video thú vị hay một tin nhắn thân thiện tạo cảm giác như một phần thưởng dopamine ngắn hạn.', 'Vì phần thưởng tiếp theo có thể xuất hiện bất cứ lúc nào, việc đặt điện thoại xuống trở nên khó khăn.'],
            'article.1': ['Vấn đề không chỉ là thời gian bị mất.', 'Mỗi lần gián đoạn đều buộc não phải làm quen lại với nhiệm vụ sau đó.', 'Người cứ vài phút lại đọc tin nhắn trong lúc viết thường cần nhiều thời gian hơn đáng kể.', 'Ngay cả khi việc trả lời chỉ mất vài giây, nó vẫn có thể làm gián đoạn dòng công việc.', 'Nghiên cứu còn cho thấy chỉ một chiếc điện thoại nằm trong tầm mắt cũng chiếm sự chú ý: một phần não phải liên tục kiềm chế ý muốn cầm lấy nó.'],
            'article.2': ['Cảm nhận về thời gian thay đổi rõ rệt.', 'Trong chuỗi bài đăng ngắn vô tận, hầu như không có tín hiệu dừng tự nhiên.', 'Sách có điểm kết thúc chương, chương trình truyền hình có điểm kết thúc tập.', 'Ngược lại, ứng dụng tự tải nội dung tiếp theo.', 'Người dùng phải tự quyết định khi nào là đủ, nhưng chính quyết định ấy càng khó hơn khi họ mệt dần.'],
            'article.3': ['Với hầu hết mọi người, từ bỏ hoàn toàn vừa không thực tế vừa không cần thiết.', 'Thay vào đó, chuyên gia khuyên giảm những tín hiệu gây phiền nhiễu.', 'Có thể tắt thông báo và để điện thoại ngoài tầm mắt khi làm việc cần tập trung.', 'Việc ấn định những thời điểm cụ thể để đọc tin nhắn cũng hữu ích.', 'Nhờ vậy, mỗi khi có tiếng báo, ta không phải quyết định lại xem có nên phản ứng không.'],
            'article.4': ['Đồng thời, các nhà tâm lý cảnh báo về giải pháp chỉ dựa vào kỹ thuật.', 'Người liên tục cầm điện thoại vì buồn chán, cô đơn hay căng thẳng sẽ thay hành vi đó bằng một màn hình khác.', 'Vì vậy, điều quan trọng là nhận ra thói quen của mình và tìm lựa chọn phù hợp: đi dạo ngắn, trò chuyện hay nghỉ ngơi không dùng phương tiện truyền thông.', 'Mục tiêu là không vô tình bỏ bê thế giới thực, chứ không phải từ chối thế giới số.']
        },
        questions: {
            16: { vi:'Vì sao nhiều người khó rời mạng xã hội?', options:{a:'Nội dung đặc biệt khó về mặt chuyên môn.',b:'Những kích thích dễ chịu mới có thể xuất hiện bất cứ lúc nào.',c:'Ứng dụng chỉ hoạt động trong thời gian ngắn.'}, evidence:[['article.0',4,['nächste Belohnung','jederzeit']]], link:'angenehme Reize ↔ Belohnung; jederzeit ↔ bất cứ lúc nào. Độ khó chuyên môn không phải nguyên nhân được nêu.' },
            17: { vi:'Một lần gián đoạn ngắn gây ra điều gì khi làm việc?', options:{a:'Ta phải nhập tâm lại vào công việc.',b:'Sau đó ta làm những nhiệm vụ dễ hơn.',c:'Ta nhớ các chi tiết tốt hơn.'}, evidence:[['article.1',1,['erneut in eine Aufgabe einzuarbeiten']]], link:'sich erneut einarbeiten ↔ sich erneut hineindenken: phải nhập tâm lại, không phải nhiệm vụ trở nên dễ hơn.' },
            18: { vi:'Chỉ một chiếc điện thoại trong tầm mắt đã có thể gây ra điều gì?', options:{a:'Nó cải thiện khả năng phản ứng nhanh.',b:'Nó tự thay đổi thời gian dùng màn hình.',c:'Nó chiếm một phần sự chú ý.'}, evidence:[['article.1',4,['sichtbares Smartphone','Aufmerksamkeit bindet','Impuls kontrollieren']]], link:'Aufmerksamkeit beanspruchen ↔ Aufmerksamkeit binden. Não tốn sự chú ý để kiềm chế ý muốn cầm điện thoại.' },
            19: { vi:'Vì sao ta dễ mất cảm nhận về thời gian trong ứng dụng?', options:{a:'Không có những điểm kết thúc tự nhiên rõ ràng.',b:'Các bài đăng ngày càng dài.',c:'Thời gian thường bị ẩn đi.'}, evidence:[['article.2',1,['kaum natürliche Stoppsignale']],['article.2',3,['automatisch den nächsten Inhalt']]], link:'Endpunkte fehlen ↔ kaum Stoppsignale. Việc tự tải tiếp làm luồng nội dung không kết thúc.' },
            20: { vi:'Chuyên gia khuyên làm gì để tập trung làm việc?', options:{a:'Trả lời mọi tin nhắn ngay.',b:'Để điện thoại ngoài tầm mắt.',c:'Chỉ giao tiếp qua máy tính.'}, evidence:[['article.3',2,['außer Sichtweite']]], link:'außer Sichtweite là tín hiệu trực tiếp cho b. Bài khuyên chọn giờ đọc tin nhắn, không trả lời tất cả ngay.' },
            21: { vi:'Theo các nhà tâm lý, điều gì chưa đủ?', options:{a:'Chỉ thay đổi những cài đặt kỹ thuật.',b:'Nghỉ ngơi mà không dùng thiết bị số.',c:'Quan sát nguyên nhân hành vi của bản thân.'}, evidence:[['article.4',0,['rein technischen Lösung']],['article.4',1,['Langeweile','Einsamkeit','Stress']]], link:'nur technische Einstellungen ↔ rein technische Lösung. Nếu gốc vấn đề là cảm xúc, đổi cài đặt chưa giải quyết được.' }
        }
    },
    lesen_t3_fleischersatz: {
        passages: {
            'article.0': ['Burger thực vật, xúc xích từ protein đậu Hà Lan và thịt nguội không có thành phần động vật ngày càng chiếm nhiều chỗ trên kệ siêu thị.', 'Sản phẩm thay thế thịt từ lâu đã không chỉ nhắm đến những người ăn chay hoàn toàn.', 'Nhiều người mua chỉ muốn bỏ thịt thông thường vào một số ngày mà không thay đổi cơ bản những món ăn quen thuộc.'],
            'article.1': ['Xét về sinh thái, những sản phẩm này có thể có lợi.', 'Việc sản xuất nguyên liệu thực vật thường cần ít diện tích và nước hơn chăn nuôi công nghiệp.', 'Lượng khí nhà kính thải ra cũng có thể thấp hơn.', 'Tuy nhiên, không có gì bảo đảm tác động sinh thái luôn tốt: nếu nguyên liệu được vận chuyển xa hoặc chế biến rất công phu, lợi ích sẽ nhỏ hơn.'],
            'article.2': ['Vì vậy, chuyên gia dinh dưỡng khuyên xem kỹ thành phần.', 'Một số sản phẩm thay thế có nhiều muối, chất béo và phụ gia để tạo mùi vị và kết cấu giống thịt.', 'Do đó, có nguồn gốc thực vật không tự động có nghĩa là lành mạnh.', 'Đồng thời, nhiều sản phẩm cung cấp chất đạm và có thể là một phần của chế độ ăn cân bằng.'],
            'article.3': ['Điều quyết định là đem nó so sánh với thứ gì.', 'Một sản phẩm thay thế được chế biến nhiều có thể kém lợi hơn món đơn giản từ đậu lăng và rau.', 'Ngược lại, khi so với xúc xích nhiều chất béo, nó có thể có kết quả tốt hơn.', 'Vì vậy, nhận xét chung chung không giúp được nhiều.', 'Ai chỉ nhìn nhãn xanh dễ bỏ qua việc một sản phẩm thuần chay cũng có thể nghèo dinh dưỡng.'],
            'article.4': ['Các tổ chức bảo vệ người tiêu dùng yêu cầu cách ghi nhãn dễ hiểu hơn.', 'Người mua nên nhìn một lần là biết sản phẩm đã được chế biến đến mức nào, nguyên liệu chính đến từ đâu và có giá trị dinh dưỡng gì.', 'Cho đến khi những thông tin này thống nhất ở mọi nơi, người mua vẫn phải so sánh bao bì.', 'Và đôi khi lựa chọn đơn giản nhất là một món vốn đã có nguồn gốc thực vật, không phải thịt hay sản phẩm thay thịt.']
        },
        questions: {
            16: { vi:'Theo bài, ai ngày càng mua nhiều sản phẩm thay thế thịt?', options:{a:'Chỉ những người luôn ăn chay hoàn toàn.',b:'Cả những người chỉ ăn ít thịt hơn vào một số thời điểm.',c:'Chủ yếu người bị dị ứng thực phẩm.'}, evidence:[['article.0',1,['nicht mehr nur']],['article.0',2,['an einigen Tagen']]], link:'nicht mehr nur loại đáp án a. an einigen Tagen ↔ zeitweise: giảm thịt vào một số ngày.' },
            17: { vi:'Khi nào lợi ích sinh thái có thể nhỏ đi?', options:{a:'Khi nguyên liệu thực vật được trồng trong vùng.',b:'Khi sản phẩm cần ít nước.',c:'Khi vận chuyển và chế biến rất tốn công sức.'}, evidence:[['article.1',3,['weite Strecken','aufwendig verarbeitet','Vorteil kleiner']]], link:'Transport über weite Strecken + aufwendige Verarbeitung làm lợi ích nhỏ hơn. Ít nước là lợi thế, không phải nguyên nhân giảm lợi ích.' },
            18: { vi:'Chuyên gia dinh dưỡng cảnh báo điều gì?', options:{a:'Coi mọi sản phẩm thực vật đều lành mạnh.',b:'Sử dụng chất đạm từ thực vật.',c:'So sánh thực phẩm theo lượng muối.'}, evidence:[['article.2',2,['nicht automatisch gesund']]], link:'grundsätzlich für gesund halten trái với nicht automatisch gesund. Bài không cấm dùng protein thực vật.' },
            19: { vi:'Vì sao khó đánh giá chung cho mọi trường hợp?', options:{a:'Giá thay đổi hằng ngày.',b:'Kết quả phụ thuộc vào sản phẩm được dùng để so sánh.',c:'Luật cấm danh sách thành phần.'}, evidence:[['article.3',0,['womit man vergleicht']],['article.3',1,['ungünstiger']],['article.3',2,['besser abschneiden']]], link:'Cùng một sản phẩm có thể kém món đậu lăng nhưng tốt hơn xúc xích nhiều mỡ; kết luận phụ thuộc vào đối tượng so sánh.' },
            20: { vi:'Theo bài, bao bì xanh có thể che khuất điều gì?', options:{a:'Sản phẩm có ít dưỡng chất.',b:'Sản phẩm có thịt.',c:'Sản phẩm đã bán hết.'}, evidence:[['article.3',4,['grüne Etikett','nährstoffarm']]], link:'wenig Nährstoffe ↔ nährstoffarm. Nhãn xanh không chứng minh giá trị dinh dưỡng tốt.' },
            21: { vi:'Các tổ chức bảo vệ người tiêu dùng yêu cầu điều gì?', options:{a:'Cấm thực phẩm được chế biến nhiều.',b:'Thông tin thống nhất và dễ hiểu.',c:'Giảm giá thịt thông thường.'}, evidence:[['article.4',0,['verständlichere Kennzeichnungen']],['article.4',2,['überall einheitlich']]], link:'leicht verständliche Informationen ↔ verständlichere Kennzeichnungen; einheitlich ↔ thống nhất. Bài yêu cầu thông tin, không yêu cầu cấm.' }
        }
    }
});

Object.assign(LESEN_REVIEW_DATA, {
    lesen_t2_reparatur: {
        passages: {
            'segments.0': ['Điện thoại có pin yếu, máy nướng bánh bị lỏng dây hay máy giặt không đóng được cửa: nhiều thiết bị được thay ngay khi bị hỏng.', 'Trong khi đó, về mặt kỹ thuật, chúng thường vẫn có thể sửa được.'],
            'segments.1': ['Một nguyên nhân là trước khi mua, người tiêu dùng khó biết sản phẩm có dễ mở ra và sửa chữa hay không.', 'Một số thiết bị có pin gắn cố định; với những thiết bị khác, chỉ sau vài năm đã không còn phụ tùng phù hợp.'],
            'segments.2': ['Vì vậy, một số nước châu Âu đang tìm cách khiến việc sửa chữa hấp dẫn hơn.', 'Ở một số khu vực, khách hàng được hoàn lại một phần chi phí nếu mang thiết bị hỏng đến sửa tại cơ sở được công nhận.'],
            'segments.3': ['Nhu cầu rất lớn.', 'Các xưởng sửa chữa cho biết nhiều người muốn sử dụng thiết bị lâu hơn nếu việc sửa chữa có giá phải chăng và không phức tạp.'],
            'segments.4': ['Tuy nhiên, những người phản đối nghi ngờ rằng chỉ trợ cấp tài chính là đủ.', 'Nhà sản xuất cần thiết kế sản phẩm sao cho có thể thay từng bộ phận mà không cần dụng cụ chuyên biệt.'],
            'segments.5': ['Phần mềm cũng đóng vai trò quan trọng.', 'Một chiếc điện thoại vẫn hoạt động về mặt kỹ thuật sẽ trở nên vô dụng nếu không còn được cập nhật bảo mật.', 'Khi đó, người tiêu dùng mua máy mới chỉ để luôn theo kịp công nghệ số.'],
            'segments.6': ['Thời gian sử dụng dài hơn không chỉ giảm gánh nặng cho các gia đình.', 'Nó còn có thể tiết kiệm nguyên liệu, tránh rác thải và nhờ đó bảo vệ tài nguyên.', 'Vì vậy, việc từ bỏ xã hội dùng rồi vứt bắt đầu ngay từ khâu thiết kế sản phẩm, chứ không đợi đến bãi tái chế.'],
            'options.a': ['Tuy nhiên, đơn đề nghị phải được nộp cùng hóa đơn.'],
            'options.b': ['Vì vậy, chuyên gia yêu cầu việc cập nhật phải được bảo đảm bắt buộc trong thời gian dài hơn.'],
            'options.c': ['Điều còn thiếu là thông tin đáng tin cậy về khả năng sửa chữa.'],
            'options.d': ['Một thiết kế như vậy có thể làm chi phí sản xuất tăng đôi chút.'],
            'options.e': ['Dù vậy, số lượng thiết bị nhà bếp mới bán ra vẫn tăng mỗi năm.'],
            'options.f': ['Khoản hỗ trợ sửa chữa chính là để giúp giải quyết điểm này.'],
            'options.g': ['Một số xưởng sửa chữa về nguyên tắc từ chối thiết bị điện tử.'],
            'options.h': ['Những đánh giá đầu tiên cho thấy chương trình thực sự được sử dụng.']
        },
        questions: {
            10: { vi:'Chỗ trống 10', evidence:[['segments.1',0,['kaum erkennen','reparieren']]], link:'Informationen über die Reparierbarkeit được cụ thể hóa ngay sau chỗ trống: người mua kaum erkennen, tức khó biết sản phẩm có dễ sửa không.' },
            11: { vi:'Chỗ trống 11', evidence:[['segments.2',1,['einen Teil der Kosten zurück']]], link:'Reparaturbonus ở câu f được giải thích trong đoạn tiếp theo bằng việc hoàn lại một phần chi phí sửa chữa.' },
            12: { vi:'Chỗ trống 12', evidence:[['segments.2',1,['Kosten zurück','anerkannten Betrieb']]], link:'Sau quyền nhận hỗ trợ, Allerdings bổ sung điều kiện nộp đơn và hóa đơn. Rechnung gắn với Kosten của việc sửa chữa.' },
            13: { vi:'Chỗ trống 13', evidence:[['segments.3',0,['Nachfrage ist groß']]], link:'Angebot tatsächlich genutzt ↔ Nachfrage ist groß: đánh giá xác nhận chương trình có người dùng thực tế.' },
            14: { vi:'Chỗ trống 14', evidence:[['segments.4',1,['Produkte so konstruieren','ohne Spezialwerkzeug']]], link:'Ein solches Design trỏ về cách thiết kế dễ thay bộ phận ngay trước đó; zwar báo trước một hạn chế về chi phí.' },
            15: { vi:'Chỗ trống 15', evidence:[['segments.5',1,['keine Sicherheitsupdates mehr']]], link:'Deshalb nối nguyên nhân thiếu cập nhật với yêu cầu Updates über einen längeren Zeitraum.' }
        }
    },
    lesen_t2_stadtverkehr: {
        passages: {
            'segments.0': ['Buổi sáng, ô tô ùn tắc trên các đường vào thành phố, xe buýt tiến chậm và cư dân than phiền về tiếng ồn.', 'Vì vậy, nhiều thành phố tìm cách giảm giao thông trong trung tâm.'],
            'segments.1': ['Một biện pháp thường được bàn đến là phí vào trung tâm bằng ô tô.', 'Ai lái ô tô vào một khu vực nhất định phải trả phí.', 'Những người ủng hộ kỳ vọng biện pháp này làm giảm số xe và ô nhiễm bụi mịn.'],
            'segments.2': ['Tuy nhiên, chỉ thu phí không giải quyết được vấn đề.', 'Người đi làm xa cần một lựa chọn thay thế đáng tin cậy; nếu không, việc đi lại sẽ đắt hơn, đặc biệt với người có thu nhập thấp.'],
            'segments.3': ['Những lựa chọn đó gồm tàu chạy thường xuyên hơn, đường xe đạp an toàn và bãi đỗ tại ga ngoài trung tâm.', 'Điều đặc biệt quan trọng là giao thông đường sắt cũng phải hoạt động vào buổi tối.'],
            'segments.4': ['Tuy nhiên, trong giai đoạn xây dựng các tuyến mới, nhiều khó khăn bổ sung xuất hiện.', 'Đường bị đóng, tuyến xe buýt được đổi lộ trình và hành khách phải tính đến việc chậm trễ.'],
            'segments.5': ['Để người dân chấp nhận những bất tiện này, thành phố phải thông báo sớm và dễ hiểu.', 'Chỉ thông báo trên màn hình điện tử là chưa đủ, vì không phải ai cũng liên tục dùng ứng dụng.'],
            'segments.6': ['Về lâu dài, một hệ thống phối hợp tốt có thể khiến trung tâm yên tĩnh và dễ tiếp cận hơn.', 'Điều quyết định là phải cung cấp lựa chọn tốt hơn, bên cạnh việc làm cho lái ô tô kém hấp dẫn đi.'],
            'options.a': ['Một số thành phố châu Âu đã có kinh nghiệm với biện pháp này.'],
            'options.b': ['Vì vậy, giao thông công cộng phải được mở rộng đồng thời.'],
            'options.c': ['Trong tương lai, chỉ khách du lịch mới được phép đỗ xe ở đó.'],
            'options.d': ['Chỉ khi đó, việc chuyển sang phương tiện khác mới khả thi với cả người làm theo ca.'],
            'options.e': ['Trong ngắn hạn, tình hình giao thông thậm chí có thể trở nên khó nắm bắt hơn vì điều đó.'],
            'options.f': ['Dù vậy, về nguyên tắc tất cả các nhà bán lẻ đều phản đối kế hoạch.'],
            'options.g': ['Vì vậy, thông tin nên được phổ biến qua nhiều kênh.'],
            'options.h': ['Nhưng trước hết cần đặt câu hỏi: có thể đạt được điều đó bằng những biện pháp nào?']
        },
        questions: {
            10: { vi:'Chỗ trống 10', evidence:[['segments.0',1,['Wegen','Verkehr im Zentrum zu verringern']]], link:'Wegen ↔ Maßnahmen. Câu h đặt câu hỏi về biện pháp; đoạn sau trả lời bằng City-Maut.' },
            11: { vi:'Chỗ trống 11', evidence:[['segments.1',0,['City-Maut']]], link:'damit trong câu a trỏ về City-Maut đã được giới thiệu ngay trước đó.' },
            12: { vi:'Chỗ trống 12', evidence:[['segments.2',1,['verlässliche Alternative']]], link:'Alternative phải được cung cấp bằng cách mở rộng giao thông công cộng. Deshalb thể hiện kết luận; đoạn sau nêu tàu, đường xe đạp và bãi đỗ.' },
            13: { vi:'Chỗ trống 13', evidence:[['segments.3',1,['auch am Abend funktioniert']]], link:'Nur dann trỏ về điều kiện có tàu cả buổi tối. Điều này mới cho phép Schichtarbeiter chuyển phương tiện.' },
            14: { vi:'Chỗ trống 14', evidence:[['segments.4',1,['gesperrt','umgeleitet','Verzögerungen']]], link:'dadurch trỏ về đóng đường và đổi tuyến; kurzfristig giới hạn khó khăn này ở ngắn hạn.' },
            15: { vi:'Chỗ trống 15', evidence:[['segments.5',1,['allein reichen nicht','nicht jeder']]], link:'Chỉ màn hình hay ứng dụng không tiếp cận hết mọi người, nên mehrere Kanäle là giải pháp nối đúng ý.' }
        }
    }
});


// Sentence translations and exact evidence for the 2026-11-21 pack.
Object.assign(LESEN_REVIEW_DATA, {
    "lesen_t1_nachbarschaft_20261121": {
        "passages": {
            "people.a": [
                "Khi chuyển đến đây hai năm trước, cuối cùng tôi cũng muốn sống trong một ngôi nhà mà mọi người quen biết nhau.",
                "Vì vậy, chính tôi đã đề xuất buổi nấu ăn hằng tháng và lúc đầu lần nào cũng cho mọi người dùng bếp của mình.",
                "Nhưng dần dần điều đó trở thành một kỳ vọng cố định: khi từ chối, tôi gần như phải giải trình.",
                "Một số người dường như đã nhầm sự hào hứng của tôi với lời cam kết lâu dài.",
                "Giờ chúng tôi luân phiên làm chủ nhà và không ai phải giải thích vì sao mình vắng một lần.",
                "Những buổi tối ấy vẫn quan trọng với tôi; chỉ là tôi không muốn cảm thấy bị buộc phải giao lưu.",
                "Suy cho cùng, thoải mái sống trong cùng một nhà không có nghĩa là phải dành toàn bộ thời gian rảnh cho nhau."
            ],
            "people.b": [
                "Nhóm trò chuyện của tòa nhà chúng tôi có tiếng xấu vì đôi khi mọi người cãi nhau về xe đạp đỗ chắn chỗ.",
                "Dù vậy, tôi không muốn bỏ nhóm, vì nó rất tiện khi cửa chính bị hỏng hoặc thất lạc kiện hàng.",
                "Điều làm tôi khó chịu là suy nghĩ rằng tin nhắn nào cũng phải được trả lời ngay.",
                "Vì thế tôi chỉ đọc bài đăng buổi tối và đã tắt thông báo.",
                "Một người hàng xóm còn phụ trách dán thông báo quan trọng ở lối vào để người không dùng điện thoại thông minh vẫn được cập nhật.",
                "Ngược lại, khi có lời trách móc cá nhân, thêm một bình luận trong nhóm chẳng giúp gì: những người liên quan nên nói chuyện trực tiếp.",
                "Công cụ số có thể giúp thống nhất công việc dễ hơn, nhưng không thể thay chúng ta thực hiện cuộc trò chuyện khó xử."
            ],
            "people.c": [
                "Trước đây tôi luôn nghĩ hàng xóm tốt phải có thể thỏa thuận với nhau mà không cần danh sách hay quy định.",
                "Vì thế, khi cùng mua một chiếc xe đạp chở hàng, ban đầu ai cần chỉ phải nhắn một tin ngắn.",
                "Nhưng đúng vào những cuối tuần nhiều người muốn đi mua sắm, nhiều người đồng thời cho rằng mình có quyền sử dụng.",
                "Từ khi chúng tôi đặt khung giờ bắt buộc và thông báo nếu trễ, chuyện bực bội đã giảm đáng kể.",
                "Nỗi lo trước kia của tôi rằng điều đó sẽ khiến quan hệ xa cách hơn đã không trở thành sự thật.",
                "Trái lại: vì không ai còn phải tranh cãi về sự thiên vị mà mình tưởng có, lúc trả xe vẫn có thời gian trò chuyện vui vẻ.",
                "Giờ đây, với tôi, lòng tin không hình thành nhờ để mọi việc tùy ý mà nhờ ai cũng có thể tin vào những thỏa thuận chung."
            ],
            "people.d": [
                "Từ khi bố tôi đi lại khó khăn hơn, tôi đặc biệt trân trọng những lời tự nguyện giúp đỡ trong tòa nhà.",
                "Một người hàng xóm thỉnh thoảng mua đồ hộ, một người khác mang các kiện hàng nặng lên tầng.",
                "Điều đó giúp cuộc sống hằng ngày nhẹ nhàng hơn, nhưng không thể đưa vào kế hoạch cố định mỗi tuần.",
                "Vì vậy chúng tôi vẫn dùng dịch vụ giao hàng có trả phí, dù có người cho rằng giờ có thể bỏ khoản chi này.",
                "Sự hỗ trợ lẫn nhau nên bổ sung cho những việc cần được tổ chức đáng tin cậy, chứ không âm thầm thay thế chúng.",
                "Ngay cả lời cảm ơn cũng không được mang nghĩa rằng lần sau đương nhiên lại mong nhận được giúp đỡ.",
                "Bố tôi cũng muốn đóng góp theo khả năng và tưới cây cho những người khác khi họ đi nghỉ.",
                "Nhờ vậy, ông vẫn là một người hàng xóm có năng lực riêng, chứ không chỉ được nhìn nhận như người cần được chăm sóc."
            ]
        },
        "questions": {
            "1": {
                "vi": "Ai đã thay đổi thái độ đối với các thỏa thuận chính thức?",
                "evidence": [
                    [
                        "people.c",
                        0,
                        [
                            "ohne Listen und Vorschriften"
                        ]
                    ],
                    [
                        "people.c",
                        6,
                        [
                            "inzwischen",
                            "dieselben Vereinbarungen"
                        ]
                    ]
                ],
                "link": "Eva trước đây phản đối quy định, sau trải nghiệm lại coi thỏa thuận rõ ràng là nền tảng tin cậy. Không nhầm với Lena: cô điều chỉnh việc tiếp khách, không thay đổi quan điểm về quy tắc nói chung."
            },
            "2": {
                "vi": "Ai cho rằng vẫn nên giữ một kênh liên lạc mặc dù nó có nhược điểm?",
                "evidence": [
                    [
                        "people.b",
                        1,
                        [
                            "Trotzdem",
                            "nicht abschaffen",
                            "praktisch"
                        ]
                    ]
                ],
                "link": "Tarek thừa nhận nhóm có tranh cãi nhưng không muốn bỏ vì tiện cho thông tin thực tế. trotzdem báo hiệu sự nhượng bộ."
            },
            "3": {
                "vi": "Ai muốn tránh việc sự giúp đỡ trở thành nền tảng duy nhất của việc chăm lo?",
                "evidence": [
                    [
                        "people.d",
                        3,
                        [
                            "bleibt der bezahlte Lieferdienst bestehen"
                        ]
                    ],
                    [
                        "people.d",
                        4,
                        [
                            "ergänzen",
                            "nicht stillschweigend an dessen Stelle"
                        ]
                    ]
                ],
                "link": "Martin giữ dịch vụ trả phí: giúp đỡ tự nguyện chỉ bổ sung, không thay cách tổ chức ổn định. Câu không hỏi ai phản đối việc giúp hàng xóm."
            },
            "4": {
                "vi": "Ai từng thấy sáng kiến của mình bị hiểu thành nghĩa vụ?",
                "evidence": [
                    [
                        "people.a",
                        1,
                        [
                            "selbst",
                            "vorgeschlagen"
                        ]
                    ],
                    [
                        "people.a",
                        3,
                        [
                            "dauerhaften Zusage"
                        ]
                    ]
                ],
                "link": "Lena tự đề xuất buổi nấu ăn nhưng sau đó bị mặc định luôn làm chủ nhà. eigene Initiative ↔ selbst vorgeschlagen; Verpflichtung ↔ dauerhafte Zusage."
            },
            "5": {
                "vi": "Ai phân biệt thông báo sự việc với việc giải quyết xung đột cá nhân?",
                "evidence": [
                    [
                        "people.b",
                        1,
                        [
                            "defekte Haustür",
                            "verlorenes Paket"
                        ]
                    ],
                    [
                        "people.b",
                        5,
                        [
                            "persönlichen Vorwürfen",
                            "direkt miteinander sprechen"
                        ]
                    ]
                ],
                "link": "Tarek dùng nhóm cho cửa hỏng và kiện hàng, nhưng yêu cầu nói trực tiếp khi có trách móc. Không phải từ bỏ hoàn toàn công cụ số."
            },
            "6": {
                "vi": "Ai kể rằng quy tắc rõ ràng thậm chí còn cải thiện quan hệ cá nhân?",
                "evidence": [
                    [
                        "people.c",
                        4,
                        [
                            "nicht bestätigt"
                        ]
                    ],
                    [
                        "people.c",
                        5,
                        [
                            "freundliches Gespräch"
                        ]
                    ]
                ],
                "link": "Eva nói ít cãi nhau hơn nên còn thời gian trò chuyện. Bẫy là đoán quy tắc sẽ làm quan hệ xa cách: đó chỉ là nỗi lo cũ đã bị bác bỏ."
            },
            "7": {
                "vi": "Ai coi trọng việc một người vẫn đóng góp dù bản thân cần được hỗ trợ?",
                "evidence": [
                    [
                        "people.d",
                        6,
                        [
                            "beteiligen",
                            "gießt"
                        ]
                    ],
                    [
                        "people.d",
                        7,
                        [
                            "eigenen Fähigkeiten"
                        ]
                    ]
                ],
                "link": "Bố Martin cần giúp đỡ nhưng vẫn tưới cây cho hàng xóm. Người nhận hỗ trợ cũng có năng lực đóng góp, không chỉ là người được chăm lo."
            },
            "8": {
                "vi": "Ai muốn tiếp tục một hoạt động chung mà không phải lần nào cũng tham gia?",
                "evidence": [
                    [
                        "people.a",
                        4,
                        [
                            "niemand muss begründen"
                        ]
                    ],
                    [
                        "people.a",
                        5,
                        [
                            "nach wie vor wichtig",
                            "nicht zur Geselligkeit verpflichtet"
                        ]
                    ]
                ],
                "link": "Lena vẫn coi trọng buổi nấu ăn nhưng muốn được vắng mặt mà không giải thích. Không phải cô muốn chấm dứt hoạt động."
            },
            "9": {
                "vi": "Ai chủ động giới hạn thời gian tiếp nhận tin nhắn?",
                "evidence": [
                    [
                        "people.b",
                        3,
                        [
                            "nur abends",
                            "Benachrichtigungen ausgeschaltet"
                        ]
                    ]
                ],
                "link": "Tarek chỉ đọc buổi tối và tắt thông báo; đây là giới hạn tiếp nhận, không phải hạn chế quyền đăng tin của người khác."
            }
        }
    },
    "lesen_t2_leihladen_20261121": {
        "passages": {
            "segments.0": [
                "Máy khoan hữu ích, nhưng trong nhiều căn hộ phần lớn thời gian nó nằm không trong tủ.",
                "Máy làm bánh quế hay vali lớn cũng vậy: mua chỉ để dùng vài lần thì khó đáng tiền.",
                "Vì thế một sáng kiến khu phố đã mở cửa hàng cho mượn những đồ vật như vậy với một khoản phí hằng năm nhỏ.",
                "Ý tưởng được ủng hộ ngay và trước khi khai trương đã có nhiều thiết bị cũ được quyên góp.",
                "Tuy nhiên, lần kiểm kê đầu tiên cho thấy khoảng cách đáng ngạc nhiên giữa nguồn cung và nhu cầu thực tế."
            ],
            "segments.1": [
                "Chính những chiếc vali này lại thiếu vào kỳ nghỉ học, lúc rất nhiều gia đình cùng muốn đi du lịch.",
                "Vì thế nhóm quyết định từ nay không nhận mọi món đồ quyên góp nữa, mà tìm có mục tiêu những thứ thường được hỏi mượn.",
                "Hiện nay một danh mục trực tuyến cho biết có những đồ vật nào và khi nào có thể mượn.",
                "Tuy nhiên, đặt trước trong danh mục chưa có nghĩa là món đồ chắc chắn được xác nhận cho thời điểm mong muốn."
            ],
            "segments.2": [
                "Chỉ xác nhận này mới có hiệu lực ràng buộc; thông báo tự động đã nhận yêu cầu là chưa đủ.",
                "Nhờ vậy có thể tránh việc ai đó đến cửa hàng vô ích vì thiết bị vẫn đang được kiểm tra hoặc bị trả muộn.",
                "Sau những tháng đầu, các tình nguyện viên còn nhận thấy hướng dẫn chi tiết không phải lúc nào cũng đủ.",
                "Một số người quan tâm đã bỏ ý định mượn vì sợ thao tác sai với một thiết bị lạ."
            ],
            "segments.3": [
                "Ở đó họ có thể thử cách vận hành thiết bị dưới sự hướng dẫn, mà chưa cần mang nó về nhà ngay.",
                "Dịch vụ này được đón nhận nhưng chiếm nhân lực, khiến những người đó không thể xử lý trả đồ cùng lúc.",
                "Việc kiểm tra, vệ sinh và sửa chữa thiết bị cũng tốn công hơn dự đoán ban đầu.",
                "Phí hằng năm tuy đủ trả linh kiện hao mòn nhưng không đủ cho chi phí mặt bằng thường xuyên."
            ],
            "segments.4": [
                "Nếu không có hỗ trợ này, phí sẽ phải tăng đáng kể, có thể khiến chính các hộ ít tiền không tham gia được.",
                "Đổi lại thành phố yêu cầu báo cáo sử dụng hằng năm, nhưng không đặt số lượt mượn tối thiểu.",
                "Dù sao với nhóm, điều quan trọng không chỉ là tần suất đồ vật được trao qua quầy.",
                "Nhóm còn muốn biết nhờ dịch vụ này các thành viên có thực sự bỏ việc tự mua đồ hay không."
            ],
            "segments.5": [
                "Trong khảo sát đó, các thành viên cho biết nếu không mượn thì họ sẽ mua, thuê nơi khác hay hoàn toàn không dùng món đồ.",
                "Các câu trả lời đầu tiên cho thấy rõ vì sao nhiều lượt mượn không tự động đồng nghĩa với mức giảm tiêu dùng lớn tương ứng.",
                "Một số thành viên chỉ dùng đồ mượn để thử sở thích mới mà trước đó họ vốn không định mua gì.",
                "Tuy nhiên, sáng kiến không vì thế kết luận rằng những lượt mượn ấy là không được mong muốn."
            ],
            "segments.6": [
                "Điều quyết định đối với sáng kiến là không nhầm lẫn các tác động khác nhau.",
                "Sử dụng chung có thể mở ra khả năng mới đồng thời thay thế việc mua sắm, nhưng không thể chứng minh cả hai bằng cùng một con số.",
                "Vì thế về lâu dài, cửa hàng không nhằm tích trữ thật nhiều thiết bị hay ghi nhận thật nhiều giao dịch.",
                "Nó phải cung cấp một cách đáng tin cậy những gì khu phố cần."
            ],
            "options.a": [
                "Vì vậy thành phố tạm thời trả tiền thuê, còn hội tổ chức vận hành."
            ],
            "options.b": [
                "Suy cho cùng, chính việc khám phá một hoạt động cũng có thể mang giá trị."
            ],
            "options.c": [
                "Để tìm hiểu điều đó, gần đây nhóm tiến hành một khảo sát ngắn sau khi trả đồ."
            ],
            "options.d": [
                "Hiện nay nhóm này có thêm một hình thức đặt trước qua điện thoại."
            ],
            "options.e": [
                "Hiện nay nhóm người này được mời tham gia các buổi hướng dẫn mở thường xuyên."
            ],
            "options.f": [
                "Có nhiều máy làm bánh quế, nhưng hầu như không có vali phù hợp."
            ],
            "options.g": [
                "Chỉ khi một nhân viên kiểm tra khả năng cung cấp, thành viên mới nhận được xác nhận riêng."
            ],
            "options.h": [
                "Từ đó, mọi thiết bị có thể được nhận ngay mà không cần phản hồi thêm."
            ]
        },
        "questions": {
            "10": {
                "vi": "Chỗ trống 10",
                "evidence": [
                    [
                        "segments.0",
                        4,
                        [
                            "Lücke zwischen Angebot und tatsächlichem Bedarf"
                        ]
                    ],
                    [
                        "options.f",
                        0,
                        [
                            "Reisekoffer"
                        ]
                    ],
                    [
                        "segments.1",
                        0,
                        [
                            "Diese",
                            "verreisen"
                        ]
                    ]
                ],
                "link": "f cụ thể hóa khoảng cách cung–cầu: nhiều máy bánh, ít vali. Diese ở câu tiếp theo chỉ Reisekoffer; không thể nối với một lựa chọn chỉ nói chung về thiết bị."
            },
            "11": {
                "vi": "Chỗ trống 11",
                "evidence": [
                    [
                        "segments.1",
                        3,
                        [
                            "noch nicht",
                            "sicher zugesagt"
                        ]
                    ],
                    [
                        "options.g",
                        0,
                        [
                            "persönliche Zusage"
                        ]
                    ],
                    [
                        "segments.2",
                        0,
                        [
                            "Erst diese Bestätigung"
                        ]
                    ]
                ],
                "link": "g bổ sung bước kiểm tra và xác nhận riêng. Erst diese Bestätigung ở sau nối chính xác với persönliche Zusage; h nói được nhận ngay, trái điều kiện chưa chắc chắn ở trước."
            },
            "12": {
                "vi": "Chỗ trống 12",
                "evidence": [
                    [
                        "segments.2",
                        3,
                        [
                            "befürchteten"
                        ]
                    ],
                    [
                        "options.e",
                        0,
                        [
                            "Einführungstermine"
                        ]
                    ],
                    [
                        "segments.3",
                        0,
                        [
                            "Dort",
                            "unter Anleitung"
                        ]
                    ]
                ],
                "link": "e đưa ra các buổi hướng dẫn cho nhóm sợ dùng sai. Dort ở sau trỏ về Einführungstermine, rồi giải thích họ được thử có hướng dẫn. Không phải thay hướng dẫn giấy bằng bán đồ."
            },
            "13": {
                "vi": "Chỗ trống 13",
                "evidence": [
                    [
                        "segments.3",
                        3,
                        [
                            "nicht jedoch",
                            "Räume"
                        ]
                    ],
                    [
                        "options.a",
                        0,
                        [
                            "die Miete"
                        ]
                    ],
                    [
                        "segments.4",
                        0,
                        [
                            "Ohne diese Unterstützung"
                        ]
                    ]
                ],
                "link": "a giải quyết khoản mặt bằng chưa được phí bao phủ. diese Unterstützung ở sau là thành phố trả tiền thuê; không phải tăng phí ngay hoặc thành phố vận hành cửa hàng."
            },
            "14": {
                "vi": "Chỗ trống 14",
                "evidence": [
                    [
                        "segments.4",
                        3,
                        [
                            "auf einen eigenen Kauf verzichten"
                        ]
                    ],
                    [
                        "options.c",
                        0,
                        [
                            "Befragung"
                        ]
                    ],
                    [
                        "segments.5",
                        0,
                        [
                            "In dieser"
                        ]
                    ]
                ],
                "link": "c đưa vào khảo sát để đo việc bỏ mua mới. In dieser ở sau là Befragung giống cái; nội dung khảo sát trả lời trực tiếp câu hỏi ở trước."
            },
            "15": {
                "vi": "Chỗ trống 15",
                "evidence": [
                    [
                        "segments.5",
                        2,
                        [
                            "neue Hobbys"
                        ]
                    ],
                    [
                        "segments.5",
                        3,
                        [
                            "nicht",
                            "unerwünscht"
                        ]
                    ],
                    [
                        "options.b",
                        0,
                        [
                            "ebenfalls einen Wert"
                        ]
                    ],
                    [
                        "segments.6",
                        0,
                        [
                            "unterschiedliche Wirkungen"
                        ]
                    ]
                ],
                "link": "b giải thích tại sao thử sở thích mới vẫn có giá trị dù không làm giảm mua sắm. Đoạn kết phân biệt hai lợi ích; d nói về đặt trước qua điện thoại, không nối với lập luận về giá trị của việc khám phá sở thích mới."
            }
        }
    },
    "lesen_t3_termine_20261121": {
        "passages": {
            "article.0": [
                "Một ghế trống ở tiệm tóc, một lịch tư vấn không được sử dụng, một bàn ăn bỏ trống: người không đến mà không báo hủy để lại nhiều hơn một khoảng trống trong lịch.",
                "Thời gian đã được giữ thường không còn dành được cho người khác, dù họ rất muốn đến.",
                "Khi ấy người ta nhanh chóng kết luận rằng khách hàng đã trở nên kém đáng tin hơn.",
                "Tuy nhiên, nhân viên một trung tâm tư vấn thành phố không muốn dừng ở lời giải thích đó và đã hỏi lý do các buổi hẹn không diễn ra."
            ],
            "article.1": [
                "Các câu trả lời khác nhau: có người nhầm giờ, có người đột xuất phải chăm con bị ốm.",
                "Nhóm thứ ba thực sự đã thử hủy nhưng không liên lạc được qua điện thoại.",
                "Đặc biệt với lịch hẹn đặt trước nhiều tuần, hoàn cảnh cá nhân cũng đã thay đổi.",
                "Như vậy không phải ghế trống nào cũng xuất phát từ cùng một thái độ, nên một biện pháp duy nhất cho mọi trường hợp cũng khó hứa hẹn hiệu quả.",
                "Điều đó không miễn trách nhiệm cho ai, nhưng chuyển sự chú ý sang các điều kiện cho phép báo hủy."
            ],
            "article.2": [
                "Trước tiên trung tâm gửi nhắc hẹn vào tối hôm trước.",
                "Nhờ vậy thực sự có ít cuộc hẹn bị quên hơn; tuy nhiên số chỗ được trả lại kịp thời hầu như không tăng.",
                "Ai đã biết mình không đến được vẫn phải gọi trong giờ tiếp nhận.",
                "Chỉ khi có thêm một đường dẫn cho phép hủy trong vài bước thì số lượt báo hủy mới tăng.",
                "Sự gia tăng này không phải dấu hiệu giảm quan tâm: giờ đây các chỗ trống có thể được mời cho người khác sớm hơn."
            ],
            "article.3": [
                "Trong cuộc tranh luận, phí phạt bỏ hẹn là biện pháp được nhắc tới nhiều.",
                "Đối với cơ sở nhỏ, một lượt khách không đến có thể gây thiệt hại kinh tế đáng kể, nên việc dùng động lực tài chính để khuyến khích báo hủy sớm là dễ hiểu.",
                "Nhưng ở trung tâm tư vấn xã hội, khả năng phải trả phí cũng có thể làm những người vốn khó kiểm soát hoàn cảnh của mình e ngại.",
                "Khi ấy họ có thể không đặt hẹn nữa, dù cần hỗ trợ.",
                "Vì thế không thể đánh giá tính hợp lý của phí mà tách khỏi mục đích dịch vụ và nhóm người dịch vụ muốn tiếp cận."
            ],
            "article.4": [
                "Danh sách chờ điện tử cũng không tự mình giải quyết được vấn đề.",
                "Khi phải phản hồi ngay để nhận chỗ vừa trống, người được phép dùng điện thoại ban ngày có lợi thế.",
                "Người làm ở quầy thu ngân hoặc xưởng có thể chỉ thấy chính tin nhắn ấy lúc nghỉ.",
                "Vì vậy trung tâm giữ một phần giờ vừa trống để liên hệ lại qua điện thoại, thay vì phân hết theo nguyên tắc ai trả lời nhanh nhất.",
                "Cách này tốn công hơn, nhưng tránh nhầm khả năng liên lạc kỹ thuật với nhu cầu thực tế."
            ],
            "article.5": [
                "Cuối cùng, với nhóm, điều quan trọng không phải số lời nhắc đã gửi hay việc lấp kín tối đa từng khung giờ.",
                "Nhóm kiểm tra xem người tìm tư vấn có nhận hỗ trợ phù hợp nhanh hơn không, và công việc hành chính tăng thêm có tương xứng không.",
                "Quy trình lấp hết khoảng trống nhưng lại chiếm mất thời gian tư vấn trực tiếp thì không phải tiến bộ.",
                "Tính cam kết vẫn quan trọng, nhưng sẽ dễ kỳ vọng hơn khi việc đặt, đổi và hủy lịch thực sự hoạt động trong cuộc sống hằng ngày."
            ]
        },
        "questions": {
            "16": {
                "vi": "Trung tâm rút ra điều gì từ các phản hồi?",
                "evidence": [
                    [
                        "article.1",
                        3,
                        [
                            "Nicht",
                            "dieselbe Haltung",
                            "eine einzige Maßnahme"
                        ]
                    ],
                    [
                        "article.1",
                        4,
                        [
                            "entbindet niemanden"
                        ]
                    ]
                ],
                "link": "b tổng hợp các nguyên nhân khác nhau nên cần cách xử lý khác nhau. a biến một nguyên nhân thành nguyên nhân chính; c trái câu vẫn giữ trách nhiệm của người đặt hẹn.",
                "options": {
                    "a": "Phần lớn lượt bỏ hẹn do đặt lịch quá sớm.",
                    "b": "Nguyên nhân khác nhau đòi hỏi nhiều hơn một cách phản ứng thống nhất.",
                    "c": "Khi có trở ngại tổ chức, trách nhiệm của khách hàng không còn."
                }
            },
            "17": {
                "vi": "Tại sao nhóm đánh giá tích cực số lần báo hủy tăng?",
                "evidence": [
                    [
                        "article.2",
                        3,
                        [
                            "zusätzlicher Link",
                            "mehr Absagen"
                        ]
                    ],
                    [
                        "article.2",
                        4,
                        [
                            "kein Zeichen schwindenden Interesses",
                            "früher anderen angeboten"
                        ]
                    ]
                ],
                "link": "a diễn đạt lại việc chỗ trống được trả sớm cho người khác. b nhầm báo hủy với nhu cầu giảm, đã bị bài bác bỏ; c nhầm tác dụng của link hủy với tác dụng nhắc nhớ.",
                "options": {
                    "a": "Thời gian không được sử dụng có thể được phân lại kịp thời.",
                    "b": "Nhờ đó nhu cầu tư vấn nói chung đã giảm.",
                    "c": "Từ đó khách hàng nhớ giờ hẹn chính xác hơn."
                }
            },
            "18": {
                "vi": "Theo bài, việc áp dụng phí bỏ hẹn nên phụ thuộc điều gì?",
                "evidence": [
                    [
                        "article.3",
                        4,
                        [
                            "welchen Zweck",
                            "wen es erreichen soll"
                        ]
                    ]
                ],
                "link": "c nêu tiêu chí tác giả kết luận: mục đích và nhóm đối tượng. Thiệt hại kinh tế ở a được thừa nhận nhưng không phải tiêu chí duy nhất. b nhắc sự thuận tiện đặt hẹn, không phải căn cứ đánh giá phí trong đoạn.",
                "options": {
                    "a": "Chỉ từ mức doanh thu bị mất.",
                    "b": "Từ việc mọi lịch hẹn có thể đặt trực tuyến hay không.",
                    "c": "Từ chức năng của dịch vụ và hoàn cảnh nhóm đối tượng."
                }
            },
            "19": {
                "vi": "Bài nhìn thấy rủi ro gì khi phân ngay lịch trống?",
                "evidence": [
                    [
                        "article.4",
                        1,
                        [
                            "im Vorteil",
                            "Telefon benutzen darf"
                        ]
                    ],
                    [
                        "article.4",
                        2,
                        [
                            "erst in der Pause"
                        ]
                    ]
                ],
                "link": "b là chênh lệch cơ hội do không được dùng điện thoại trong giờ làm. a đảo ngược quan hệ tốc độ–nhu cầu; c là suy luận không có trong bài, vì không nói thời gian tư vấn bị rút ngắn.",
                "options": {
                    "a": "Người cần gấp nhất thường trả lời quá nhanh.",
                    "b": "Khả năng liên lạc do điều kiện công việc ảnh hưởng cơ hội nhận chỗ.",
                    "c": "Người được báo gấp nhận được buổi tư vấn ngắn hơn."
                }
            },
            "20": {
                "vi": "Trung tâm muốn đạt điều gì qua các cuộc liên hệ lại bằng điện thoại?",
                "evidence": [
                    [
                        "article.4",
                        3,
                        [
                            "einen Teil",
                            "nicht alles",
                            "schnellsten Antwort"
                        ]
                    ],
                    [
                        "article.4",
                        4,
                        [
                            "aufwendiger",
                            "tatsächlichem Bedarf"
                        ]
                    ]
                ],
                "link": "c diễn đạt mục đích không dành hết lịch cho người phản hồi nhanh. a sai vì vẫn giữ kênh điện tử; b đảo nghĩa vì cách này tốn công hơn, không giảm hành chính.",
                "options": {
                    "a": "Họ muốn dần thay thế hoàn toàn danh sách chờ điện tử.",
                    "b": "Họ muốn xử lý lịch trống với ít nhân lực hơn.",
                    "c": "Họ muốn việc tiếp cận bớt phụ thuộc vào phản hồi trực tuyến nhanh."
                }
            },
            "21": {
                "vi": "Cuối cùng nhóm đo thành công của các biện pháp bằng điều gì?",
                "evidence": [
                    [
                        "article.5",
                        1,
                        [
                            "schneller passende Unterstützung",
                            "Verwaltungsaufwand",
                            "vernünftigen Verhältnis"
                        ]
                    ],
                    [
                        "article.5",
                        2,
                        [
                            "kein Fortschritt"
                        ]
                    ]
                ],
                "link": "a giữ cả hai tiêu chí: hỗ trợ phù hợp nhanh hơn và chi phí tổ chức tương xứng. b là mục tiêu lấp kín lịch mà đoạn cuối bác bỏ; c đánh giá theo công cụ chứ không theo ích lợi thực tế.",
                "options": {
                    "a": "Bằng khả năng tiếp cận hỗ trợ phù hợp tốt hơn với công sức hợp lý.",
                    "b": "Bằng việc không lịch nào còn trống bất kể công sức.",
                    "c": "Bằng tỷ lệ lịch hẹn được đặt không cần liên hệ trực tiếp."
                }
            }
        }
    },
    "lesen_t4_sonntag_20261121": {
        "passages": {
            "opinions.a": [
                "Khi tôi tan làm trong tuần thì thư viện vừa đóng cửa.",
                "Thứ Bảy tôi mua sắm cho bố mẹ nên ngày này cũng hiếm khi phù hợp.",
                "Mở vài giờ Chủ nhật sẽ cho tôi cơ hội thong thả xem các kệ sách, thay vì lúc nào cũng chỉ vội nhận sách đã đặt.",
                "Tôi không cần chương trình sự kiện lớn cho việc đó, mà đơn giản là một cánh cửa mở."
            ],
            "opinions.b": [
                "Ở chỗ tôi đã có mở cửa Chủ nhật, nhưng không có nhân viên chuyên môn.",
                "Ai biết mình tìm gì thì xoay xở được; nhưng với việc tra cứu phức tạp, máy tự động không đủ.",
                "Điều làm tôi khó chịu không hẳn là dịch vụ hạn chế, mà là quảng cáo hứa một ngày thư viện hoàn toàn bình thường.",
                "Cần nói rõ có thể làm gì và việc gì vẫn phải đến vào ngày làm việc."
            ],
            "opinions.c": [
                "Nhân viên của chúng tôi về cơ bản ủng hộ giờ mở cửa dài hơn.",
                "Nhưng nếu vẫn những người ấy phải đến thêm Chủ nhật mà không được giảm tải ở nơi khác thì cách tính đó không ổn.",
                "Tình nguyện viên có thể hỗ trợ sự kiện, nhưng điều đó không có nghĩa là họ đảm nhận trách nhiệm chuyên môn.",
                "Trước khi mở rộng, phải bảo đảm có thêm vị trí nhân sự và bù đắp đáng tin cậy cho các ca cuối tuần."
            ],
            "opinions.d": [
                "Cuộc thảo luận cứ xoay quanh số lượt mượn.",
                "Nhưng tôi thường đến thư viện mà không mang gì về, vì có thể đọc báo và gặp người khác ở đó.",
                "Khác với quán cà phê, tôi không phải gọi món; khác ở nhà, tôi không cô đơn.",
                "Chính vào Chủ nhật, nhiều người thiếu một nơi như thế, mà ích lợi không thể đọc ra từ số sách đã mượn."
            ],
            "opinions.e": [
                "Tôi sẽ thử việc mở Chủ nhật trước ở một cơ sở duy nhất.",
                "Sau vài tháng có thể so sánh việc sử dụng, chi phí và phản hồi của nhân viên trước khi triển khai ở nơi khác.",
                "Một Chủ nhật đầu tiên đông kín chưa chứng minh rằng sự quan tâm sẽ duy trì lâu dài.",
                "Tương tự, một ngày ít khách cũng chưa nên có nghĩa là phải chấm dứt."
            ],
            "opinions.f": [
                "Vào cửa bằng thẻ thành viên nghe đơn giản, nhưng đòi hỏi người dùng hiểu quy định và công nghệ.",
                "Nếu không, người chưa có thẻ hoặc không tự tin dùng máy sẽ bị đứng ngoài.",
                "Vì vậy, trước khi mở Chủ nhật không có nhân viên, thư viện nên tổ chức hướng dẫn và giải thích cách liên hệ hỗ trợ trong tình huống khẩn cấp.",
                "Chỉ kéo dài thời gian chưa tạo ra quyền tiếp cận cho tất cả mọi người."
            ],
            "opinions.g": [
                "Thư viện định tổ chức đọc sách vào Chủ nhật ở sân trong, ngay dưới cửa sổ phòng ngủ của chúng tôi.",
                "Tôi không muốn cấm ai đọc sách hay gặp gỡ, nhưng chúng tôi cũng cần một ngày yên tĩnh.",
                "Vì vậy cần có giờ cố định cho sự kiện ngoài trời và loa phải đặt trong nhà.",
                "Với những thỏa thuận ấy, tôi có thể ủng hộ việc mở cửa mà không phải từ bỏ mọi sự quan tâm tới cư dân."
            ],
            "opinions.h": [
                "Tôi thấy điểm nghẽn lớn nhất ở ngân sách tài liệu, chứ không phải giờ mở cửa.",
                "Với tiểu thuyết được ưa chuộng, người ta chờ hàng tháng, còn sách chuyên môn mới thường thiếu hẳn.",
                "Nếu có thêm tiền, tôi muốn dùng để mở rộng kho sách hơn là tài trợ thêm một ngày mở cửa.",
                "Kệ sách có thể tiếp cận lâu hơn cũng ít hữu ích nếu không có cuốn sách cần tìm."
            ],
            "example": [
                "Giờ mở cửa phù hợp với cuộc sống hằng ngày của mình"
            ]
        },
        "questions": {
            "22": {
                "vi": "Không chỉ là chỗ mượn sách: một nơi không buộc phải tiêu tiền",
                "evidence": [
                    [
                        "opinions.d",
                        1,
                        [
                            "anderen Menschen begegnen"
                        ]
                    ],
                    [
                        "opinions.d",
                        2,
                        [
                            "nichts bestellen"
                        ]
                    ]
                ],
                "link": "d nói đến đọc báo, gặp người và không cần gọi món. f cũng nói về tiếp cận, nhưng trọng tâm là rào cản thẻ và công nghệ, không phải không gian giao tiếp miễn phí."
            },
            "23": {
                "vi": "Hoạt động mở rộng cần điều kiện lao động được bảo đảm",
                "evidence": [
                    [
                        "opinions.c",
                        3,
                        [
                            "zusätzliche Stellen",
                            "Ausgleich für Wochenenddienste"
                        ]
                    ]
                ],
                "link": "c ủng hộ có điều kiện: thêm người và bù đắp ca cuối tuần. Không nhầm h: h muốn ưu tiên tiền cho sách, không đưa điều kiện nhân sự cho việc mở rộng."
            },
            "24": {
                "vi": "Tự phục vụ bằng công nghệ không được loại trừ ai",
                "evidence": [
                    [
                        "opinions.f",
                        1,
                        [
                            "keinen Ausweis",
                            "Terminal unsicher"
                        ]
                    ],
                    [
                        "opinions.f",
                        3,
                        [
                            "noch keinen Zugang für alle"
                        ]
                    ]
                ],
                "link": "f tập trung vào người không thẻ hoặc không hiểu máy, rồi yêu cầu hướng dẫn. b cũng nhắc máy nhưng yêu cầu quảng cáo trung thực về giới hạn dịch vụ."
            },
            "25": {
                "vi": "Thông báo trung thực về giới hạn dịch vụ",
                "evidence": [
                    [
                        "opinions.b",
                        2,
                        [
                            "weniger",
                            "Werbung"
                        ]
                    ],
                    [
                        "opinions.b",
                        3,
                        [
                            "deutlich sagen",
                            "weiterhin werktags"
                        ]
                    ]
                ],
                "link": "b không chủ yếu yêu cầu tăng dịch vụ mà yêu cầu nói rõ những việc chưa làm được Chủ nhật. Cụm weniger ... als nhấn mạnh sự chênh lệch giữa quảng cáo và thực tế."
            },
            "26": {
                "vi": "Tìm giải pháp khả thi có xét đến cư dân xung quanh",
                "evidence": [
                    [
                        "opinions.g",
                        2,
                        [
                            "feste Zeiten",
                            "Lautsprecher"
                        ]
                    ],
                    [
                        "opinions.g",
                        3,
                        [
                            "unterstützen",
                            "Rücksichtnahme"
                        ]
                    ]
                ],
                "link": "g sẵn sàng ủng hộ nếu có giờ sự kiện và giới hạn loa. Không phải phản đối toàn bộ việc mở cửa hoặc chỉ nói giờ phù hợp với khách đọc."
            },
            "27": {
                "vi": "Thu thập kinh nghiệm trước rồi quyết định mở rộng",
                "evidence": [
                    [
                        "opinions.e",
                        0,
                        [
                            "zunächst",
                            "erproben"
                        ]
                    ],
                    [
                        "opinions.e",
                        1,
                        [
                            "Nach einigen Monaten",
                            "bevor weitere Standorte"
                        ]
                    ]
                ],
                "link": "e đề nghị thử ở một nơi nhiều tháng và đánh giá nhiều yếu tố. Số đông ở ngày đầu không đủ kết luận; h không đề nghị thử mà muốn dùng tiền cho kho sách."
            }
        }
    },
    "lesen_t5_gemeinschaftsraum_20261121": {
        "passages": {
            "headings.a": [
                "Nhóm người được phép dùng và mục đích sự kiện"
            ],
            "headings.b": [
                "Thủ tục đặt chỗ và hiệu lực ràng buộc"
            ],
            "headings.c": [
                "Thay đổi và hủy lịch đã đặt"
            ],
            "headings.d": [
                "Lưu giữ đồ dùng cá nhân"
            ],
            "headings.e": [
                "Vệ sinh và bàn giao sau khi dùng"
            ],
            "headings.f": [
                "Giờ ra vào và lưu ý khi hoạt động"
            ],
            "headings.g": [
                "Thanh toán chi phí khi gây thiệt hại"
            ],
            "headings.h": [
                "Giao và bảo quản chìa khóa"
            ],
            "example": [
                "Phòng sinh hoạt chung dành cho cư dân thành niên của khu nhà tổ chức sự kiện cá nhân, phi thương mại.",
                "Được mời khách bên ngoài nếu một người có quyền sử dụng chịu trách nhiệm cho sự kiện.",
                "Không được giao lại cho bên thứ ba tự sử dụng."
            ],
            "sections.28": [
                "Yêu cầu sử dụng phải nộp qua cổng quản lý chậm nhất bảy ngày lịch trước ngày dự kiến.",
                "Tin nhắn tự động xác nhận đã nhận đơn chưa phải là chấp thuận.",
                "Việc đặt chỗ chỉ có hiệu lực khi có xác nhận bằng văn bản của ban quản lý.",
                "Nếu có nhiều đơn cho cùng khoảng thời gian, thời điểm nộp đơn đầy đủ là yếu tố quyết định.",
                "Các cuộc họp cư dân định kỳ được miễn quy tắc này và được ưu tiên.",
                "Việc từng được sử dụng không tạo ra quyền đòi các lịch tiếp theo."
            ],
            "sections.29": [
                "Chậm nhất khi hết thời gian được xác nhận, phòng phải được dọn trống và quét sạch để bàn giao.",
                "Bát đĩa đã dùng phải rửa và trả về chỗ quy định; rác phải bỏ vào thùng dành riêng bên ngoài tòa nhà.",
                "Thời gian thực hiện các việc này phải được tính trong thời gian đã đặt.",
                "Một giờ trống ngay sau đó trong lịch không cho phép bàn giao muộn hơn.",
                "Các thiếu sót phát hiện khi bàn giao phải được ghi vào biên bản; yêu cầu thanh toán nếu có sẽ được quyết định riêng."
            ],
            "sections.30": [
                "Lịch sử dụng đã xác nhận có thể được hủy miễn phí đến 48 giờ trước khi bắt đầu.",
                "Thời điểm quyết định là khi ban quản lý nhận thông báo, không phải lúc gửi.",
                "Nếu rút sau đó vẫn phải trả khoản phí cố định đã thỏa thuận, trừ khi phòng được giao cho người khác trong cùng khung giờ.",
                "Yêu cầu đổi ngày được coi là hủy lịch cũ và cần một đơn mới.",
                "Không được tự đổi lịch với người sử dụng khác, dù hai bên cùng đồng ý."
            ]
        },
        "questions": {
            "28": {
                "vi": "Điều 28",
                "evidence": [
                    [
                        "sections.28",
                        0,
                        [
                            "einzureichen"
                        ]
                    ],
                    [
                        "sections.28",
                        2,
                        [
                            "erst",
                            "schriftlichen Bestätigung"
                        ]
                    ],
                    [
                        "sections.28",
                        3,
                        [
                            "vollständigen Antrags"
                        ]
                    ]
                ],
                "link": "Toàn đoạn quy định nộp đơn, xác nhận và thứ tự ưu tiên, nên chọn b. Nhắc Hausversammlungen không biến nó thành quy định nhóm người ở a; chưa bàn đổi hay hủy nên không chọn c."
            },
            "29": {
                "vi": "Điều 29",
                "evidence": [
                    [
                        "sections.29",
                        0,
                        [
                            "geräumt und besenrein",
                            "übergeben"
                        ]
                    ],
                    [
                        "sections.29",
                        2,
                        [
                            "gebuchte Zeit"
                        ]
                    ],
                    [
                        "sections.29",
                        4,
                        [
                            "gesondert entschieden"
                        ]
                    ]
                ],
                "link": "Trọng tâm là tình trạng phòng và thời hạn bàn giao sau khi dùng. Chi phí chỉ là chi tiết phụ và được quyết định riêng, nên g không bao quát đoạn. f nói giờ ra vào hoạt động, không phải trách nhiệm dọn trả phòng."
            },
            "30": {
                "vi": "Điều 30",
                "evidence": [
                    [
                        "sections.30",
                        0,
                        [
                            "storniert"
                        ]
                    ],
                    [
                        "sections.30",
                        2,
                        [
                            "es sei denn"
                        ]
                    ],
                    [
                        "sections.30",
                        3,
                        [
                            "anderen Termin",
                            "Absage"
                        ]
                    ]
                ],
                "link": "Đoạn nói hủy và đổi lịch đã xác nhận, khác b là đăng ký ban đầu. Có khoản phí nhưng không phải bồi thường thiệt hại tài sản của g. Chú ý ngoại lệ es sei denn: được miễn nếu phòng được giao lại đúng khung giờ."
            }
        }
    }
});

// Bilingual review and evidence for pack 2.
Object.assign(LESEN_REVIEW_DATA, {
    "lesen_t1_kochen_20261121b": {
        "passages": {
            "people.a": [
                "Giờ đây vào Chủ nhật tôi ghi lại món định nấu trong ba buổi tối tiếp theo và mua thực phẩm tương ứng.",
                "Trước đây tôi thấy kế hoạch như vậy không cần thiết, cho tới khi nhận ra đồ trong bao đã mở của mình thường hỏng đến thế nào.",
                "Từ đó tôi chủ động dùng cùng nguyên liệu trong nhiều món, chẳng hạn rau chân vịt trước trong súp rồi sau làm nhân.",
                "Dù vậy tôi không muốn lên lịch cả tuần vì thỉnh thoảng tôi ngẫu hứng đi ăn với bạn.",
                "Điều tôi tiết kiệm chủ yếu là công sức quyết định mỗi ngày trước kệ siêu thị; không nhất thiết nhờ đó mà nấu nhanh hơn.",
                "Tôi vẫn thử công thức mới, nhưng chỉ khi đã biết sẽ dùng nguyên liệu còn dư vào việc gì.",
                "Kế hoạch phải tạo khoảng tự do cho tôi, chứ không thành nghĩa vụ mới phải hoàn thành mỗi tối."
            ],
            "people.b": [
                "Sau một ngày làm việc dài tôi rất muốn ăn món nóng, nhưng hiếm khi có hứng đứng bếp thêm một tiếng.",
                "Vì vậy ngăn đông của tôi luôn có rau và sốt tự nấu để nhanh chóng làm được món gì đó.",
                "Trước đây tôi coi đó là kém hơn nguyên liệu tươi; giờ tôi lại khó chịu hơn với quan niệm rằng bữa ăn tử tế nhất thiết phải cầu kỳ.",
                "Dù vậy khi có khách, đôi lúc tôi vẫn chuẩn bị nhiều món theo lượt, vì ngày nghỉ làm vậy khiến tôi vui.",
                "Nhưng trong tuần tôi không đo tài nấu ăn bằng thời gian mình bận rộn.",
                "Một món súp làm sẵn cũng được, miễn là tôi thấy ngon; tôi không muốn phải biện minh bữa tối của mình với người khác.",
                "Tôi thích dùng thời gian tiết kiệm được ra ngoài hơn là chụp ảnh những đĩa thức ăn thật đẹp."
            ],
            "people.c": [
                "Ở căn hộ chung, chúng tôi từng cố gắng tối nào cũng ăn cùng nhau trong thời gian dài.",
                "Điều đó nghe có vẻ gắn kết, nhưng lại khiến có người phải chờ trong đói bụng hoặc sát giờ ăn mới nhận được báo vắng.",
                "Giờ chúng tôi chỉ hẹn vào thứ Tư, ai muốn tham gia thì báo trước tối hôm trước.",
                "Những ngày còn lại mỗi người tự lo, mà không bị hiểu là thiếu quan tâm tới nhau.",
                "Khi nấu chung, tôi ít quan tâm món mới hơn là cuối cùng cũng có thời gian trò chuyện với nhau không vội vã.",
                "Từ khi ít ăn cùng nhau hơn, những buổi tối của chúng tôi thực sự thoải mái hơn.",
                "Tôi thích một buổi gặp cố định để mong đợi hơn là yêu cầu hằng ngày không thực sự hợp lịch của ai."
            ],
            "people.d": [
                "Tôi chỉ khám phá việc nấu ăn khi phải chú ý kỹ hơn đến thức ăn vì tình trạng không dung nạp.",
                "Ban đầu tôi làm đúng công thức vì sợ đổi một nguyên liệu thì món ăn sẽ hỏng.",
                "Giờ tôi nắm được một số kỹ thuật nền tảng và điều chỉnh món theo thứ mình ăn được và nguyên liệu đang có.",
                "Điều đó giúp tôi bớt phụ thuộc vào sản phẩm đặc biệt thường đắt hoặc khó mua.",
                "Dù vậy tôi thấy nấu cho người khác khó hơn, vì khẩu vị của tôi không tự động là khẩu vị của họ.",
                "Vì thế trước khi mời tôi hỏi trước, thay vì ngầm cho rằng ai cũng thích cùng những nguyên liệu.",
                "Khi ấy tôi đặc biệt mong được trao đổi về món ăn, kể cả khi có người thích nêm khác."
            ]
        },
        "questions": {
            "1": {
                "vi": "Ai giờ có thể làm khác hướng dẫn nhờ vững kỹ năng hơn?",
                "evidence": [
                    [
                        "people.d",
                        1,
                        [
                            "streng an Rezepte"
                        ]
                    ],
                    [
                        "people.d",
                        2,
                        [
                            "Grundtechniken",
                            "ändere Gerichte"
                        ]
                    ]
                ],
                "link": "David chuyển từ bám công thức sang tự điều chỉnh nhờ nắm kỹ thuật. Không nhầm với Nora: kế hoạch linh hoạt của cô liên quan lịch ăn, không phải kỹ năng nấu."
            },
            "2": {
                "vi": "Ai thấy ăn chung ít hơn đã cải thiện đời sống chung?",
                "evidence": [
                    [
                        "people.c",
                        5,
                        [
                            "seltener",
                            "entspannter"
                        ]
                    ]
                ],
                "link": "Mila đối chiếu yêu cầu ăn chung mỗi ngày với một buổi cố định; seltener lại dẫn tới entspannter, không phải quan hệ kém đi."
            },
            "3": {
                "vi": "Ai lên kế hoạch còn nhằm sử dụng hết thực phẩm đã mua?",
                "evidence": [
                    [
                        "people.a",
                        1,
                        [
                            "angebrochene Packungen",
                            "verdarben"
                        ]
                    ],
                    [
                        "people.a",
                        2,
                        [
                            "dieselben Zutaten",
                            "verschiedenen Gerichten"
                        ]
                    ]
                ],
                "link": "Nora nhận ra đồ đã mở bị hỏng và dùng nguyên liệu trong nhiều món. Ben dự trữ đồ đông lạnh để tiết kiệm thời gian, không nêu mục tiêu xử lý nguyên liệu thừa."
            },
            "4": {
                "vi": "Ai phản đối đánh giá chất lượng bữa ăn qua công sức bỏ ra?",
                "evidence": [
                    [
                        "people.b",
                        2,
                        [
                            "ordentliches Essen",
                            "aufwendig"
                        ]
                    ],
                    [
                        "people.b",
                        4,
                        [
                            "nicht daran",
                            "wie lange"
                        ]
                    ]
                ],
                "link": "Ben phản đối quan niệm món tử tế phải cầu kỳ. Anh vẫn có thể nấu nhiều món khi rảnh nên không phải luôn ghét nấu phức tạp."
            },
            "5": {
                "vi": "Ai bắt đầu nấu ăn do hoàn cảnh sức khỏe?",
                "evidence": [
                    [
                        "people.d",
                        0,
                        [
                            "erst entdeckt",
                            "Unverträglichkeit"
                        ]
                    ]
                ],
                "link": "Nguyên nhân David bắt đầu là Unverträglichkeit. Chú ý erst ... als chỉ thời điểm và động lực ban đầu, khác việc lựa chọn khẩu vị sau này."
            },
            "6": {
                "vi": "Ai dù chuẩn bị vẫn chủ động chừa chỗ cho quyết định ngẫu hứng?",
                "evidence": [
                    [
                        "people.a",
                        0,
                        [
                            "nächsten drei Abenden"
                        ]
                    ],
                    [
                        "people.a",
                        3,
                        [
                            "nicht festlegen",
                            "spontan"
                        ]
                    ]
                ],
                "link": "Nora chỉ lên lịch ba tối, không cả tuần, để vẫn đi ăn với bạn. Đây là giới hạn của kế hoạch chứ không từ bỏ việc chuẩn bị."
            },
            "7": {
                "vi": "Với ai, giao tiếp cá nhân là điều quan trọng nhất khi nấu chung?",
                "evidence": [
                    [
                        "people.c",
                        4,
                        [
                            "weniger um neue Gerichte",
                            "miteinander zu reden"
                        ]
                    ]
                ],
                "link": "Mila nhấn mạnh weniger ... als: trò chuyện quan trọng hơn món mới. David cũng thích trao đổi nhưng nói về mời khách, không về cùng nấu ăn."
            },
            "8": {
                "vi": "Ai chủ động nấu cầu kỳ ở mức khác nhau tùy thời gian rảnh?",
                "evidence": [
                    [
                        "people.b",
                        0,
                        [
                            "selten Lust"
                        ]
                    ],
                    [
                        "people.b",
                        3,
                        [
                            "mehrere Gänge",
                            "an freien Tagen"
                        ]
                    ]
                ],
                "link": "Ben chọn món nhanh trong tuần nhưng có thể làm nhiều món vào ngày nghỉ. Không suy ra anh không bao giờ dành nhiều công cho bữa ăn."
            },
            "9": {
                "vi": "Ai khi mời khách sẽ chủ động kiểm tra xem họ có cùng sở thích ăn uống không?",
                "evidence": [
                    [
                        "people.d",
                        4,
                        [
                            "nicht automatisch ihrer"
                        ]
                    ],
                    [
                        "people.d",
                        5,
                        [
                            "frage ich",
                            "alle würden dieselben Zutaten mögen"
                        ]
                    ]
                ],
                "link": "David không mặc định khẩu vị mình là của khách nên hỏi trước. Hỏi về món thích không đồng nghĩa chỉ hỏi về bệnh không dung nạp."
            }
        }
    },
    "lesen_t2_paketraum_20261121b": {
        "passages": {
            "segments.0": [
                "Ai không ở nhà ban ngày đều biết những mẩu giấy trong hòm thư: một kiện hàng ở chỗ hàng xóm, kiện khác tại chi nhánh ngoại ô.",
                "Vì vậy ở một tòa nhà lớn, ban đại diện đề xuất dành phòng trống tầng trệt để nhận hàng.",
                "Thoạt nghe đó là giải pháp đơn giản, vì đã có diện tích và gần như không cần sửa chữa.",
                "Nhưng trước khi mở đã phát hiện không phải mọi đơn vị giao hàng đều dùng cùng một hệ thống ra vào."
            ],
            "segments.1": [
                "Với những đơn vị ấy, ban quản lý phải làm rõ riêng xem có thể để hàng trong phòng không và theo điều kiện nào.",
                "Một biển ở cửa chính không đủ, dù một số cư dân đã kỳ vọng như vậy.",
                "Sau nhiều thỏa thuận, đợt thử ba tháng bắt đầu với các doanh nghiệp tham gia.",
                "Nhân viên giao hàng nhận mã có thời hạn, còn cư dân dùng chìa khóa tòa nhà thông thường.",
                "Ai muốn dùng lựa chọn mới phải đăng ký rõ ràng; không bắt buộc tham gia."
            ],
            "segments.2": [
                "Với những người đó, cách giao cũ tới cửa căn hộ hoặc điểm nhận đã thỏa thuận vẫn được giữ.",
                "Nhờ vậy, người ban đầu hoài nghi cũng có thể quan sát trải nghiệm trong tòa nhà mà chưa phải đổi ngay cách nhận của mình.",
                "Tuy nhiên, không lâu sau đã thấy chỉ thông báo có hàng được giao là chưa đủ.",
                "Lúc cao điểm, nhiều thùng trông giống nhau đặt sát nhau khiến việc tìm lâu hơn dự kiến."
            ],
            "segments.3": [
                "Từ đó thông tin này cũng được đưa vào thông báo, nên chỉ phải tìm trong một khu vực nhỏ.",
                "Ngược lại, không thể làm ngăn riêng cho mỗi căn hộ vì thiếu chỗ.",
                "Ngoài ra vẫn còn câu hỏi được để kiện hàng ở đó bao lâu.",
                "Một số cư dân đi xa, người khác hoãn lấy chính vì đường đi giờ quá tiện.",
                "Vì thế sau vài tuần phòng đầy đến mức gần như không thể xếp thêm kiện mới."
            ],
            "segments.4": [
                "Sau thời hạn này, người nhận được nhắc và phải thống nhất giải pháp với ban quản lý.",
                "Chẳng hạn ai vắng lâu có thể nhờ người tin cậy nhận hộ.",
                "Không có kế hoạch tự động gửi trả, vì không nên quyết định việc đó mà không trao đổi.",
                "Điều đó tạo thêm việc cho ban quản lý, vốn đã bị đánh giá thấp trong kế hoạch ban đầu."
            ],
            "segments.5": [
                "Trong đó không chỉ ghi số kiện mà cả thời gian tìm, các câu hỏi và khiếu nại.",
                "Đánh giá cuối kỳ cho thấy ít hàng xóm phải nhận hộ hơn, nhưng ban quản lý lại phải đứng ra giải quyết thường xuyên hơn.",
                "Như vậy công sức không đơn giản biến mất, mà một phần chuyển sang nơi khác.",
                "Dù vậy đa số ủng hộ tiếp tục sử dụng phòng, miễn là khâu phụ trách bổ sung được tổ chức đáng tin cậy."
            ],
            "segments.6": [
                "Vì thế trước mắt cộng đồng cư dân chỉ quyết định gia hạn sáu tháng và xác định ai phụ trách giải đáp.",
                "Sau đó sẽ cùng đánh giá lại giải pháp có hiệu quả lâu dài hay không.",
                "Phòng nhận hàng tiết kiệm đường đi, nhưng không vận hành được nếu thiếu quy tắc và người xử lý ngoại lệ."
            ],
            "options.a": [
                "Vì vậy mỗi kiện hàng được quy định thời gian lưu tối đa năm ngày."
            ],
            "options.b": [
                "Những người khác lại chủ động không đăng ký."
            ],
            "options.c": [
                "Tuy nhiên, mức ủng hộ cao chưa tự nó trả lời câu hỏi về người chịu trách nhiệm."
            ],
            "options.d": [
                "Để đánh giá tác động như vậy, nhóm lập biên bản đơn giản trong giai đoạn thử."
            ],
            "options.e": [
                "Một số doanh nghiệp cho tới lúc đó hoàn toàn chưa có quy trình này."
            ],
            "options.f": [
                "Vì thế mỗi khu kệ được gắn số dễ nhìn."
            ],
            "options.g": [
                "Sau sự đồng ý này, việc mở lâu dài đã được quyết định mà không còn điều kiện nào."
            ],
            "options.h": [
                "Trong khoảng thời gian đó phòng sẽ chỉ dành riêng cho những cư dân đang vắng mặt."
            ]
        },
        "questions": {
            "10": {
                "vi": "Chỗ trống 10",
                "evidence": [
                    [
                        "segments.0",
                        3,
                        [
                            "nicht alle Zustelldienste"
                        ]
                    ],
                    [
                        "options.e",
                        0,
                        [
                            "Einige Unternehmen"
                        ]
                    ],
                    [
                        "segments.1",
                        0,
                        [
                            "Mit diesen",
                            "einzeln klären"
                        ]
                    ]
                ],
                "link": "e đưa vào các doanh nghiệp chưa có quy trình, là đối tượng của Mit diesen ở sau. Hệ thống ra vào khác nhau khiến phải thỏa thuận riêng, không thể chỉ treo biển."
            },
            "11": {
                "vi": "Chỗ trống 11",
                "evidence": [
                    [
                        "segments.1",
                        4,
                        [
                            "eine Pflicht zur Teilnahme gab es nicht"
                        ]
                    ],
                    [
                        "options.b",
                        0,
                        [
                            "gegen eine Anmeldung"
                        ]
                    ],
                    [
                        "segments.2",
                        0,
                        [
                            "Für sie",
                            "bisherige Zustellung"
                        ]
                    ]
                ],
                "link": "b nói về người không đăng ký; Für sie ở sau giải thích họ vẫn dùng cách nhận cũ. Đây là lựa chọn cá nhân, không phải cấm họ nhận hàng."
            },
            "12": {
                "vi": "Chỗ trống 12",
                "evidence": [
                    [
                        "segments.2",
                        3,
                        [
                            "ähnlich aussehende Kartons",
                            "Suchen"
                        ]
                    ],
                    [
                        "options.f",
                        0,
                        [
                            "Nummer"
                        ]
                    ],
                    [
                        "segments.3",
                        0,
                        [
                            "Diese Angabe"
                        ]
                    ]
                ],
                "link": "f cung cấp số khu kệ để giải quyết việc tìm thùng giống nhau. Diese Angabe ở sau là số này. Câu tiếp theo phân biệt đánh số khu với làm ngăn riêng từng hộ."
            },
            "13": {
                "vi": "Chỗ trống 13",
                "evidence": [
                    [
                        "segments.3",
                        4,
                        [
                            "so voll"
                        ]
                    ],
                    [
                        "options.a",
                        0,
                        [
                            "fünf Tagen"
                        ]
                    ],
                    [
                        "segments.4",
                        0,
                        [
                            "dieser Frist"
                        ]
                    ]
                ],
                "link": "a đặt thời hạn năm ngày để giải quyết phòng quá đầy. dieser Frist ở sau cần mốc thời gian cụ thể này; h dành phòng cho người vắng không giải quyết hàng tồn và không đưa thời hạn rõ."
            },
            "14": {
                "vi": "Chỗ trống 14",
                "evidence": [
                    [
                        "segments.4",
                        3,
                        [
                            "zusätzliche Arbeit"
                        ]
                    ],
                    [
                        "options.d",
                        0,
                        [
                            "Protokoll"
                        ]
                    ],
                    [
                        "segments.5",
                        0,
                        [
                            "Darin"
                        ]
                    ]
                ],
                "link": "d đưa ra biên bản ghi theo dõi; Darin ở sau trỏ vào biên bản rồi liệt kê dữ liệu. Đây là đánh giá công việc phát sinh, không phải cho rằng ít đường đi thì chắc chắn ít việc."
            },
            "15": {
                "vi": "Chỗ trống 15",
                "evidence": [
                    [
                        "segments.5",
                        3,
                        [
                            "sofern"
                        ]
                    ],
                    [
                        "options.c",
                        0,
                        [
                            "Zuständigkeit"
                        ]
                    ],
                    [
                        "segments.6",
                        0,
                        [
                            "nur eine Verlängerung",
                            "zuständig"
                        ]
                    ]
                ],
                "link": "c nhấn mạnh cần làm rõ trách nhiệm dù đa số ủng hộ. Vì thế đoạn sau chỉ gia hạn có thời hạn và chỉ định người phụ trách. g trái cả điều kiện sofern ở trước lẫn quyết định chỉ thử tiếp ở sau."
            }
        }
    },
    "lesen_t3_bewertungen_20261121b": {
        "passages": {
            "article.0": [
                "Một máy pha cà phê nhận nhiều đánh giá hào hứng, nhưng sau khi mua chủ nhân mới thất vọng: máy quá ồn cho căn bếp nhỏ của cô.",
                "Điều đó không nhất thiết có nghĩa là các đánh giá tích cực đã bị bịa.",
                "Người chủ yếu pha nhiều cà phê có thể coi trọng những yếu tố khác với người không muốn đánh thức ai vào sáng sớm.",
                "Vì thế đánh giá không chỉ mô tả sản phẩm mà còn phản ánh những kỳ vọng thường không được nói ra."
            ],
            "article.1": [
                "Tuy vậy, khi so nhiều sản phẩm, ánh nhìn thường dừng trước tiên ở số sao trung bình.",
                "Con số này dễ nhìn, nhưng gộp những trải nghiệm rất khác nhau.",
                "Một khách chấm việc giao nhanh, người khác chấm thao tác, người thứ ba viết về chất lượng sau chỉ một lần dùng.",
                "Vì vậy trung bình cao có thể định hướng ban đầu, nhưng không thay thế việc hỏi từng nhận xét dựa vào đâu.",
                "Đặc biệt khi hai sản phẩm được chấm gần nhau, đọc từng nhận xét đáng làm hơn so chữ số thập phân thứ hai."
            ],
            "article.2": [
                "Dấu hiệu xác nhận đã mua cũng dễ bị đánh giá quá cao.",
                "Nó có thể cho biết một tài khoản khách thực sự đã đặt món hàng qua nền tảng.",
                "Nhưng từ đó không biết được người ấy đã kiểm tra kỹ, có đủ kinh nghiệm hay được lợi ích để viết đánh giá hay không.",
                "Do đó dấu hiệu này là thông tin bổ sung, chứ không phải bảo chứng cho chất lượng lập luận của nhận xét."
            ],
            "article.3": [
                "Nhận xét phê bình có thể đặc biệt hữu ích khi nêu điều kiện cụ thể.",
                "Nói tai nghe gây cấn khi đeo kính sau hai tiếng hữu ích hơn kết luận chung chung rằng nó tệ.",
                "Với người không đeo kính, nhược điểm này có thể ít quan trọng; với người đeo kính, nó có thể là yếu tố quyết định.",
                "Cũng hữu ích khi nhiều phản hồi độc lập mô tả cùng vấn đề dưới điều kiện tương tự.",
                "Điều khiến phê bình giá trị không phải mức gay gắt mà là khả năng hiểu và liên hệ nó với cách sử dụng của mình."
            ],
            "article.4": [
                "Cuối cùng có người cứ đọc tiếp cho tới khi tìm được đánh giá xác nhận lựa chọn ban đầu.",
                "Khi ấy việc tìm kiếm có vẻ kỹ lưỡng nhưng hầu như không làm cân nhắc cởi mở hơn.",
                "Vì vậy trong một buổi hướng dẫn, một tư vấn viên tiêu dùng khuyên ghi trước ba đặc tính không thể thiếu và một tiêu chí có thể thỏa hiệp.",
                "Nhờ đó có thể kiểm tra có mục tiêu hơn xem phản đối nào thực sự chống lại việc mua hay chỉ phản ánh sở thích khác.",
                "Tuy nhiên danh sách không ngăn mọi quyết định sai và nên được đổi khi đọc thấy một khía cạnh quan trọng trước đó đã bỏ sót."
            ],
            "article.5": [
                "Như vậy nhận xét của khách không vô ích, cũng không phải quyết định mua đã làm sẵn.",
                "Chúng cung cấp dấu hiệu mà ý nghĩa chỉ rõ khi đặt trong quan hệ với yêu cầu của mình.",
                "Ai sau khi đọc giải thích rõ hơn vì sao sản phẩm hợp cuộc sống mình đã thu được nhiều hơn người chỉ tìm ra số sao cao nhất."
            ]
        },
        "questions": {
            "16": {
                "vi": "Ví dụ máy pha cà phê làm rõ điều gì?",
                "evidence": [
                    [
                        "article.0",
                        1,
                        [
                            "nicht zwangsläufig"
                        ]
                    ],
                    [
                        "article.0",
                        3,
                        [
                            "Erwartungen"
                        ]
                    ]
                ],
                "link": "c là luận điểm các kỳ vọng sử dụng khác nhau. a suy diễn nhận xét bị bịa, điều bài phủ nhận là không nhất thiết; b thu hẹp mọi người mua vào tiếng ồn.",
                "options": {
                    "a": "Đánh giá tốt thường được viết khi không có trải nghiệm thực.",
                    "b": "Với đồ gia dụng, tiếng ồn là tiêu chí mua quan trọng nhất.",
                    "c": "Thiết bị được đánh giá tốt có thể không hợp nhu cầu khác."
                }
            },
            "17": {
                "vi": "Bài mô tả giới hạn nào của số sao trung bình?",
                "evidence": [
                    [
                        "article.1",
                        2,
                        [
                            "Versand",
                            "Bedienung",
                            "einzigen Einsatz"
                        ]
                    ],
                    [
                        "article.1",
                        3,
                        [
                            "worauf die Urteile jeweils beruhen"
                        ]
                    ]
                ],
                "link": "a tổng hợp việc giao hàng, thao tác và chất lượng được gộp cùng con số. b nhầm lời khuyên không quá chú ý số lẻ với lỗi tính; c thêm kết luận về số người mà bài không nêu.",
                "options": {
                    "a": "Con số không cho thấy các cơ sở đánh giá khác nhau.",
                    "b": "Các nền tảng thường tính sai khác biệt nhỏ.",
                    "c": "Con số tự giảm khi có nhiều người đánh giá hơn."
                }
            },
            "18": {
                "vi": "Theo bài, xác nhận đã mua nói lên điều gì?",
                "evidence": [
                    [
                        "article.2",
                        1,
                        [
                            "ein Kundenkonto",
                            "bestellt"
                        ]
                    ],
                    [
                        "article.2",
                        2,
                        [
                            "geht daraus nicht hervor"
                        ]
                    ]
                ],
                "link": "b chỉ giữ phạm vi xác nhận giao dịch qua tài khoản. Nó không bảo đảm tự do khỏi lợi ích như c hoặc thử đủ lâu như a.",
                "options": {
                    "a": "Người đánh giá đã thử sản phẩm đủ lâu.",
                    "b": "Có chứng cứ tài khoản liên quan đã đặt hàng qua nền tảng.",
                    "c": "Đánh giá được đưa ra không có động lực tài chính hay lợi ích khác."
                }
            },
            "19": {
                "vi": "Khi nào một bình luận tiêu cực đặc biệt có giá trị thông tin?",
                "evidence": [
                    [
                        "article.3",
                        1,
                        [
                            "nach zwei Stunden",
                            "unter einer Brille"
                        ]
                    ],
                    [
                        "article.3",
                        4,
                        [
                            "Nicht die Schärfe",
                            "Nachvollziehbarkeit"
                        ]
                    ]
                ],
                "link": "a diễn đạt điều kiện cụ thể giúp liên hệ với việc dùng của mình. b nhầm tính gay gắt với chất lượng; c thêm tiêu chuẩn tương đồng toàn bộ sở thích, bài chỉ cần điều kiện liên quan.",
                "options": {
                    "a": "Khi nhược điểm được mô tả có thể liên hệ với cách dùng của mình.",
                    "b": "Khi nó được viết dứt khoát hơn hẳn đánh giá tích cực.",
                    "c": "Khi người viết có cùng sở thích trong mọi lĩnh vực."
                }
            },
            "20": {
                "vi": "Danh sách lập trước có mục đích gì?",
                "evidence": [
                    [
                        "article.4",
                        2,
                        [
                            "unverzichtbare Eigenschaften",
                            "Kompromiss"
                        ]
                    ],
                    [
                        "article.4",
                        3,
                        [
                            "gezielter prüfen"
                        ]
                    ],
                    [
                        "article.4",
                        4,
                        [
                            "sollte geändert werden"
                        ]
                    ]
                ],
                "link": "c hướng sự đánh giá vào nhu cầu riêng thay vì chỉ tìm xác nhận lựa chọn có sẵn. a sai vì danh sách vẫn cần chỉnh khi thấy yếu tố mới; b bài không đề nghị bỏ qua phản đối.",
                "options": {
                    "a": "Nó chốt quyết định mua trước khi đọc.",
                    "b": "Nó khiến việc xem xét đánh giá trái ý trở nên thừa.",
                    "c": "Nó giúp cân nhắc phản đối theo ưu tiên của bản thân."
                }
            },
            "21": {
                "vi": "Bài rút ra kết luận nào?",
                "evidence": [
                    [
                        "article.5",
                        0,
                        [
                            "weder nutzlos"
                        ]
                    ],
                    [
                        "article.5",
                        1,
                        [
                            "im Verhältnis",
                            "eigenen Anforderungen"
                        ]
                    ]
                ],
                "link": "b là kết luận đánh giá cung cấp căn cứ phải đối chiếu nhu cầu. a biến đánh giá thành quyết định thay người mua; c loại bỏ dữ liệu hữu ích, trái weder nutzlos.",
                "options": {
                    "a": "Khi đủ nhiều đánh giá, có thể bỏ việc tự xem xét.",
                    "b": "Giá trị đánh giá phụ thuộc cách liên hệ chúng với hoàn cảnh riêng.",
                    "c": "Tốt nhất xác định yêu cầu của mình mà không dùng nhận xét của khách."
                }
            }
        }
    },
    "lesen_t4_nebensaison_20261121b": {
        "passages": {
            "opinions.a": [
                "Tôi thích ra biển tháng Mười một vì có thể đi dọc bãi biển lâu mà không phải liên tục tránh các nhóm người.",
                "Tôi chấp nhận trời tối sớm hơn và một số quán cà phê đóng cửa để đổi lấy điều đó.",
                "Với tôi thư giãn không nằm ở sử dụng thật nhiều dịch vụ, mà ở việc cuối cùng cũng bớt kích thích xung quanh."
            ],
            "opinions.b": [
                "Người ta cứ nói chỉ cần dời chuyến đi một chút thì mọi thứ sẽ rẻ và yên tĩnh hơn.",
                "Nhưng với con đang đi học và công ty ấn định kỳ nghỉ từ lâu, đó không phải lựa chọn có thể tự do dùng.",
                "Vì vậy tôi khó chịu với lời trách rằng các gia đình chỉ vì tiện mà cùng đi một thời điểm.",
                "Trước khi khuyên họ lên kế hoạch tốt hơn, cần nhìn giới hạn lịch của họ."
            ],
            "opinions.c": [
                "Tôi điều hành khách sạn nhỏ và cũng muốn nhận nhiều khách hơn vào mùa đông.",
                "Khi đó tôi có thể ký hợp đồng dài hơn với nhân viên thay vì mỗi mùa xuân phải hướng dẫn nhóm mới.",
                "Chỉ một mùa hè kín khách không đủ cho cam kết ấy khi phần còn lại trong năm hầu như không có đặt phòng.",
                "Vì vậy với tôi điều quan trọng không hẳn là tổng lượng khách tăng thêm, mà là phân bố đều hơn."
            ],
            "opinions.d": [
                "Khách sạn giá tốt mùa thu trông rất hấp dẫn trong quảng cáo, nhưng xe buýt từ ga khi ấy chỉ chạy hai chuyến một ngày.",
                "Không có ô tô, chúng tôi phải đi taxi cho vài chuyến tham quan nên tiền tiết kiệm nhanh chóng hết.",
                "Giờ trước khi đặt tôi kiểm tra trước tiên ở nơi đến thực sự có thể đi tới đâu.",
                "Giá phòng thấp thực ra nói được rất ít về tổng chi phí lưu trú."
            ],
            "opinions.e": [
                "Là cư dân thị trấn ven biển, vào mùa đông tôi không đơn giản mong có lượng người đông như tháng Tám.",
                "Những tháng yên hơn cho chúng tôi thời gian sửa đường và hồi phục sau hoạt động mùa hè.",
                "Nếu giờ tuần nào cũng có sự kiện lớn mới để hút khách, chính khoảng nghỉ ấy sẽ mất.",
                "Khách được chào đón, nhưng kéo dài mùa du lịch cần giới hạn phù hợp cả với người địa phương."
            ],
            "opinions.f": [
                "Giờ tôi thích lên kế hoạch đi bộ đường dài mùa xuân hơn là nghỉ tắm biển rồi ngày nào cũng trông nắng.",
                "Không thể đặt trước thời tiết, nhưng có thể điều chỉnh kỳ vọng theo mùa.",
                "Với tôi một sáng mưa không phải ngày nghỉ bị mất nếu ngay từ đầu tôi đã tính cả bảo tàng hoặc một ngày đọc sách.",
                "Điều quyết định là tôi không mặc định tháng Tư có cùng chương trình như giữa hè."
            ],
            "opinions.g": [
                "Quảng cáo du lịch mùa xuân thường nhấn mạnh ít chen chúc tự động đồng nghĩa ít tác động môi trường.",
                "Nhưng nếu vì thế người ta đi thêm chuyến hoặc chọn máy bay tới nơi xa, lợi thế này không hề chắc chắn.",
                "Vì vậy tôi sẽ xét cách di chuyển và số chuyến của mình trước khi lấy riêng tháng đi làm bằng chứng bền vững.",
                "Bãi biển vắng hơn có thể dễ chịu, nhưng không thay được sự cân nhắc đó."
            ],
            "opinions.h": [
                "Từ khi đi du lịch một mình, tôi thích đặt sát ngày nhất.",
                "Khi xuất hiện khoảng thời gian thuận lợi, tôi không muốn bị ràng buộc bởi quyết định đã chốt từ lâu.",
                "Đôi khi tôi không còn tìm được khách sạn mong muốn, nhưng đổi lại có thể tận dụng tuần rảnh bất ngờ.",
                "Sự linh hoạt ấy quan trọng với tôi hơn cảm giác chắc chắn biết từng chi tiết từ nhiều tháng trước."
            ],
            "example": [
                "Bớt náo nhiệt đem lại lợi ích nghỉ ngơi cá nhân"
            ]
        },
        "questions": {
            "22": {
                "vi": "Ưu đãi rẻ cuối cùng có thể thành đắt",
                "evidence": [
                    [
                        "opinions.d",
                        1,
                        [
                            "Taxi",
                            "Ersparnis rasch aufgebraucht"
                        ]
                    ],
                    [
                        "opinions.d",
                        3,
                        [
                            "gesamte Aufenthalt kostet"
                        ]
                    ]
                ],
                "link": "d đối chiếu giá phòng thấp với chi phí taxi khiến hết tiền tiết kiệm. h có nhắc tìm khách sạn nhưng trọng tâm là linh hoạt đặt sát ngày, không phải tổng chi phí."
            },
            "23": {
                "vi": "Bớt tập trung cao điểm giúp việc làm ổn định hơn",
                "evidence": [
                    [
                        "opinions.c",
                        1,
                        [
                            "längere Verträge"
                        ]
                    ],
                    [
                        "opinions.c",
                        3,
                        [
                            "gleichmäßigere Verteilung"
                        ]
                    ]
                ],
                "link": "c muốn phân bố khách đều để ký hợp đồng dài, không nhất thiết tăng tổng khách. b cũng nhắc công ty nhưng nói về giới hạn lịch của người đi du lịch."
            },
            "24": {
                "vi": "Không phải ai cũng tự do chọn thời điểm đi",
                "evidence": [
                    [
                        "opinions.b",
                        1,
                        [
                            "schulpflichtigen Kindern",
                            "keine frei verfügbare Möglichkeit"
                        ]
                    ]
                ],
                "link": "b bác lời trách gia đình đi cùng mùa vì lịch học và công ty hạn chế lựa chọn. Không nhầm h: người đó tự chọn giữ sự linh hoạt, không bị ràng buộc như b."
            },
            "25": {
                "vi": "Chỉ phân tán thời điểm chưa bảo đảm lợi ích sinh thái",
                "evidence": [
                    [
                        "opinions.g",
                        1,
                        [
                            "zusätzlich gereist",
                            "keineswegs sicher"
                        ]
                    ],
                    [
                        "opinions.g",
                        2,
                        [
                            "Anreise",
                            "Zahl meiner Reisen"
                        ]
                    ]
                ],
                "link": "g phân biệt bớt đông với bền vững: cần xét đi thêm chuyến và phương tiện. e lo mất thời gian nghỉ của địa phương, không phân tích tác động cách di chuyển."
            },
            "26": {
                "vi": "Điều chỉnh chương trình nghỉ theo điều kiện thay đổi",
                "evidence": [
                    [
                        "opinions.f",
                        1,
                        [
                            "Erwartungen",
                            "Jahreszeit anpassen"
                        ]
                    ],
                    [
                        "opinions.f",
                        2,
                        [
                            "Museen",
                            "Lesetag"
                        ]
                    ]
                ],
                "link": "f thay đổi kỳ vọng và chuẩn bị hoạt động thay thế theo mùa, không hứa thời tiết tốt. h nói về thời điểm đặt chứ không về chương trình phù hợp mùa."
            },
            "27": {
                "vi": "Ngay cả điểm du lịch cũng cần thời gian nghỉ",
                "evidence": [
                    [
                        "opinions.e",
                        1,
                        [
                            "Wege instand zu setzen",
                            "erholen"
                        ]
                    ],
                    [
                        "opinions.e",
                        2,
                        [
                            "diese Pause verloren"
                        ]
                    ]
                ],
                "link": "e đòi giữ khoảng nghỉ để sửa chữa và hồi phục. a muốn yên cho kỳ nghỉ cá nhân; e bảo vệ nhịp sống của người địa phương."
            }
        }
    },
    "lesen_t5_abendkurs_20261121b": {
        "passages": {
            "headings.a": [
                "Đăng ký và hình thành hợp đồng"
            ],
            "headings.b": [
                "Xếp trình độ và chuyển cấp độ khóa học"
            ],
            "headings.c": [
                "Rút đăng ký và hoàn học phí"
            ],
            "headings.d": [
                "Buổi học bỏ lỡ và hình thức học bù"
            ],
            "headings.e": [
                "Điều kiện cấp giấy xác nhận tham gia"
            ],
            "headings.f": [
                "Sử dụng tài liệu học"
            ],
            "headings.g": [
                "Trung tâm hủy khóa học"
            ],
            "headings.h": [
                "Cách thanh toán và hạn trả"
            ],
            "example": [
                "Đăng ký qua mẫu trực tuyến hoặc trực tiếp tại văn phòng.",
                "Đăng ký chỉ có hiệu lực ràng buộc khi trung tâm đã gửi xác nhận bằng văn bản.",
                "Chỉ đến học buổi đầu không thay thế việc đăng ký."
            ],
            "sections.28": [
                "Trước khóa ngoại ngữ nâng tiếp cần làm bài xếp trình độ, trừ khi có chứng nhận được công nhận về kiến thức nền cần thiết.",
                "Kết quả dùng để phân vào nhóm phù hợp và không phải kỳ thi tốt nghiệp.",
                "Nếu trong hai tuần đầu việc xếp lớp tỏ ra không phù hợp, có thể xin chuyển với sự thống nhất của người phụ trách khóa.",
                "Việc thực hiện đòi hỏi có chỗ trống ở nhóm muốn chuyển tới.",
                "Từ đó không phát sinh quyền yêu cầu mở thêm khóa."
            ],
            "sections.29": [
                "Về nguyên tắc các buổi không tham gia không được hoàn tiền cũng không được chuyển cho người khác.",
                "Khi có chứng cứ ốm dài ngày, ban quản lý có thể cho phép dự buổi tương ứng ở lớp song song nếu còn chỗ.",
                "Không có quyền đương nhiên được hưởng điều này; cần chấp thuận trước bằng văn bản.",
                "Dù vậy vẫn có thể tự làm bài tập được cung cấp, nhưng không được tính là đã học bù có mặt.",
                "Buổi do người phụ trách hủy không thuộc các quy định này và sẽ được xếp lại riêng."
            ],
            "sections.30": [
                "Giấy xác nhận được cấp theo yêu cầu khi đã dự ít nhất bốn phần năm số giờ học quy định.",
                "Căn cứ là danh sách điểm danh do người phụ trách lập, gồm cả buổi học bù được phê duyệt.",
                "Giấy này chỉ xác nhận việc tham gia, không khẳng định trình độ ngôn ngữ đạt được.",
                "Nó không thay thế chứng chỉ kỳ thi riêng.",
                "Việc cấp còn đòi hỏi đã trả đủ học phí; chỉ có thỏa thuận trả góp thì chưa đủ."
            ]
        },
        "questions": {
            "28": {
                "vi": "Điều 28",
                "evidence": [
                    [
                        "sections.28",
                        0,
                        [
                            "Einstufungstest"
                        ]
                    ],
                    [
                        "sections.28",
                        2,
                        [
                            "Wechsel beantragt"
                        ]
                    ],
                    [
                        "sections.28",
                        3,
                        [
                            "freien Platz"
                        ]
                    ]
                ],
                "link": "b bao quát xếp trình độ và điều kiện chuyển nhóm. Đoạn không nói cấp giấy tham gia ở e: Einstufungstest không phải Abschlussprüfung. Không tự có quyền đòi lớp mới khi hết chỗ."
            },
            "29": {
                "vi": "Điều 29",
                "evidence": [
                    [
                        "sections.29",
                        0,
                        [
                            "Nicht wahrgenommene Unterrichtsstunden"
                        ]
                    ],
                    [
                        "sections.29",
                        1,
                        [
                            "Parallelkurs"
                        ]
                    ],
                    [
                        "sections.29",
                        4,
                        [
                            "nicht betroffen"
                        ]
                    ]
                ],
                "link": "d bao quát bỏ lỡ buổi và ngoại lệ học bù. Có nhắc không hoàn tiền nhưng không phải rút cả khóa ở c; câu cuối loại buổi do giáo viên hủy khỏi quy định, nên không chọn g."
            },
            "30": {
                "vi": "Điều 30",
                "evidence": [
                    [
                        "sections.30",
                        0,
                        [
                            "Bescheinigung",
                            "vier Fünftel"
                        ]
                    ],
                    [
                        "sections.30",
                        2,
                        [
                            "ausschließlich die Teilnahme"
                        ]
                    ],
                    [
                        "sections.30",
                        4,
                        [
                            "vollständig entrichtet"
                        ]
                    ]
                ],
                "link": "e là chủ đề bao trùm: điều kiện và ý nghĩa giấy xác nhận. Trả đủ phí chỉ là một điều kiện phụ, không biến đoạn thành cách và hạn thanh toán ở h. Giấy không chứng nhận trình độ."
            }
        }
    }
});
